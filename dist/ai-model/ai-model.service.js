"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiModelService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bull_1 = require("@nestjs/bull");
const config_1 = require("@nestjs/config");
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
const ai_model_schema_1 = require("./schemas/ai-model.schema");
const defect_types_service_1 = require("../defect-types/defect-types.service");
const events_gateway_1 = require("../gateway/events.gateway");
const queue_constants_1 = require("../queue/queue.constants");
let AiModelService = class AiModelService {
    aiModelModel;
    trainingQueue;
    defectTypesService;
    eventsGateway;
    configService;
    autoTrainTimeout = null;
    constructor(aiModelModel, trainingQueue, defectTypesService, eventsGateway, configService) {
        this.aiModelModel = aiModelModel;
        this.trainingQueue = trainingQueue;
        this.defectTypesService = defectTypesService;
        this.eventsGateway = eventsGateway;
        this.configService = configService;
    }
    async getCurrent() {
        return this.aiModelModel
            .findOne({ status: 'active' })
            .populate('defectTypes', 'code name')
            .sort({ activatedAt: -1 });
    }
    async getHistory(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.aiModelModel
                .find()
                .populate('defectTypes', 'code name')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            this.aiModelModel.countDocuments(),
        ]);
        return { data, total, page, limit };
    }
    async triggerManualTraining() {
        const activeDefects = await this.defectTypesService.findAll(true);
        const defectTypeIds = activeDefects.map((d) => d._id.toString());
        const version = `v${Date.now()}`;
        const newModel = await this.aiModelModel.create({
            version,
            status: 'training',
            defectTypes: defectTypeIds,
            trainStartedAt: new Date(),
        });
        await this.trainingQueue.add(queue_constants_1.JOB_TRAINING, {
            modelId: newModel._id.toString(),
            defectTypeIds,
        });
        return newModel;
    }
    async getTrainingDataset() {
        const activeDefects = await this.defectTypesService.findAll(true);
        const classes = activeDefects.map((d) => d.code);
        const samples = [];
        for (const defect of activeDefects) {
            if (!defect.sampleImages)
                continue;
            for (const img of defect.sampleImages) {
                samples.push({ filePath: img.filePath, label: defect.code });
            }
        }
        return { classes, samples };
    }
    async predict(fileBuffer, filename) {
        const aiServiceUrl = this.configService.get('AI_SERVICE_URL', 'http://127.0.0.1:8000');
        const apiKey = this.configService.get('INTERNAL_API_KEY');
        const form = new form_data_1.default();
        form.append('image', fileBuffer, { filename });
        try {
            const response = await axios_1.default.post(`${aiServiceUrl}/inference`, form, {
                headers: {
                    ...form.getHeaders(),
                    'x-internal-key': apiKey,
                },
            });
            return response.data;
        }
        catch (error) {
            console.error('AI Service predict error:', error.response?.data || error.message);
            throw new common_1.InternalServerErrorException(`AI Service error: ${error.response?.data?.detail || error.message}`);
        }
    }
    async onTrainingComplete(modelId, accuracy, trainedOn) {
        const model = await this.aiModelModel.findById(modelId);
        if (!model)
            throw new common_1.NotFoundException('Model not found');
        await this.aiModelModel.updateMany({ status: 'active' }, { status: 'archived' });
        const activeDefects = await this.defectTypesService.findAll(true);
        for (const dt of activeDefects) {
            await this.defectTypesService.updateLastTrainedSampleCount(dt._id.toString(), dt.sampleCount);
        }
        const activated = await this.aiModelModel.findByIdAndUpdate(modelId, {
            status: 'active',
            accuracy,
            trainedOn,
            trainCompletedAt: new Date(),
            activatedAt: new Date(),
        }, { new: true }).populate('defectTypes', 'code name');
        this.eventsGateway.emitModelUpdated(activated);
        return activated;
    }
    async checkAutoTraining(reason) {
        if (this.autoTrainTimeout) {
            clearTimeout(this.autoTrainTimeout);
        }
        this.autoTrainTimeout = setTimeout(async () => {
            this.autoTrainTimeout = null;
            try {
                const isTraining = await this.aiModelModel.exists({ status: 'training' });
                if (isTraining)
                    return;
                let shouldTrain = false;
                let actualReason = reason;
                if (!shouldTrain && !reason) {
                    const activeDefects = await this.defectTypesService.findAll(true);
                    for (const dt of activeDefects) {
                        if (Math.abs(dt.sampleCount - dt.lastTrainedSampleCount) >= 10) {
                            shouldTrain = true;
                            actualReason = `Tự động huấn luyện: Loại lỗi ${dt.code} có số lượng ảnh thay đổi (${dt.lastTrainedSampleCount} -> ${dt.sampleCount})`;
                            break;
                        }
                    }
                }
                else if (reason) {
                    shouldTrain = true;
                }
                if (shouldTrain) {
                    const stillTraining = await this.aiModelModel.exists({ status: 'training' });
                    if (!stillTraining) {
                        await this.triggerManualTraining();
                        console.log(`Auto Training Triggered: ${actualReason}`);
                    }
                }
            }
            catch (error) {
                console.error('Error during auto-training check:', error);
            }
        }, 5000);
    }
    async getTrainingProgress() {
        const aiUrl = this.configService.get('AI_SERVICE_URL');
        try {
            const { data } = await axios_1.default.get(`${aiUrl}/train/progress`, { timeout: 3000 });
            return data;
        }
        catch (e) {
            return { is_training: false, model_id: null, progress: 0, message: 'Không thể kết nối đến AI Service' };
        }
    }
    async onTrainingFailed(modelId, reason) {
        const model = await this.aiModelModel.findById(modelId);
        if (!model)
            return null;
        if (model.retryCount < 2 && reason !== 'Đã gửi yêu cầu huỷ huấn luyện') {
            model.retryCount += 1;
            model.status = 'training';
            await model.save();
            await this.trainingQueue.add(queue_constants_1.JOB_TRAINING, {
                modelId: model._id.toString(),
                defectTypeIds: model.defectTypes.map((id) => id.toString()),
            });
            console.log(`Model ${modelId} failed (${reason}). Retrying... (${model.retryCount}/2)`);
            this.eventsGateway.emitModelUpdated(model);
            return model;
        }
        const failed = await this.aiModelModel.findByIdAndUpdate(modelId, {
            status: 'archived',
            trainCompletedAt: new Date(),
            reason,
        }, { new: true });
        this.eventsGateway.emitModelUpdated(failed);
        return failed;
    }
    async cancelTraining(id) {
        const model = await this.aiModelModel.findById(id);
        if (!model || model.status !== 'training') {
            throw new common_1.NotFoundException('Model is not training or not found');
        }
        const aiUrl = this.configService.get('AI_SERVICE_URL');
        const internalKey = this.configService.get('INTERNAL_API_KEY');
        try {
            await axios_1.default.post(`${aiUrl}/train/cancel`, {}, { headers: { 'x-internal-key': internalKey }, timeout: 5000 });
        }
        catch (e) {
            console.error('Failed to send cancel request to AI Service', e);
        }
        return this.onTrainingFailed(id, 'Đã gửi yêu cầu huỷ huấn luyện');
    }
    async deleteModel(id) {
        const model = await this.aiModelModel.findById(id);
        if (!model)
            throw new common_1.NotFoundException('Model not found');
        if (model.status === 'active' || model.status === 'training') {
            throw new Error('Cannot delete active or training model');
        }
        await this.aiModelModel.findByIdAndDelete(id);
        return { success: true };
    }
};
exports.AiModelService = AiModelService;
exports.AiModelService = AiModelService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(ai_model_schema_1.AiModel.name)),
    __param(1, (0, bull_1.InjectQueue)(queue_constants_1.QUEUE_TRAINING)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => defect_types_service_1.DefectTypesService))),
    __metadata("design:paramtypes", [mongoose_2.Model, Object, defect_types_service_1.DefectTypesService,
        events_gateway_1.EventsGateway,
        config_1.ConfigService])
], AiModelService);
//# sourceMappingURL=ai-model.service.js.map