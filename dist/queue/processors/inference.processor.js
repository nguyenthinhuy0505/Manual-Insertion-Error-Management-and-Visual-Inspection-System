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
var InferenceProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InferenceProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const config_1 = require("@nestjs/config");
const axios_1 = __importDefault(require("axios"));
const queue_constants_1 = require("../queue.constants");
const image_schema_1 = require("../../images/schemas/image.schema");
const inspection_schema_1 = require("../../inspections/schemas/inspection.schema");
const defect_type_schema_1 = require("../../defect-types/schemas/defect-type.schema");
const ai_model_schema_1 = require("../../ai-model/schemas/ai-model.schema");
const alerts_service_1 = require("../../alerts/alerts.service");
const events_gateway_1 = require("../../gateway/events.gateway");
let InferenceProcessor = InferenceProcessor_1 = class InferenceProcessor {
    imageModel;
    inspectionModel;
    defectTypeModel;
    aiModelModel;
    configService;
    alertsService;
    eventsGateway;
    logger = new common_1.Logger(InferenceProcessor_1.name);
    constructor(imageModel, inspectionModel, defectTypeModel, aiModelModel, configService, alertsService, eventsGateway) {
        this.imageModel = imageModel;
        this.inspectionModel = inspectionModel;
        this.defectTypeModel = defectTypeModel;
        this.aiModelModel = aiModelModel;
        this.configService = configService;
        this.alertsService = alertsService;
        this.eventsGateway = eventsGateway;
    }
    async handleInference(job) {
        const { imageId, filePath, productId, location } = job.data;
        this.logger.log(`Running inference for image ${imageId}`);
        try {
            const aiUrl = this.configService.get('AI_SERVICE_URL');
            const internalKey = this.configService.get('INTERNAL_API_KEY');
            const FormData = require('form-data');
            const fs = require('fs');
            const form = new FormData();
            form.append('image', fs.createReadStream(filePath));
            const response = await axios_1.default.post(`${aiUrl}/inference`, form, {
                headers: { ...form.getHeaders(), 'x-internal-key': internalKey },
                timeout: 30000,
            });
            const { label, confidence, is_unknown } = response.data;
            const threshold = this.configService.get('CONFIDENCE_THRESHOLD') ?? 0.7;
            let defectTypeDoc = null;
            const hasLabel = !is_unknown && label && label.trim() !== '';
            if (hasLabel) {
                defectTypeDoc = await this.defectTypeModel.findOne({
                    code: { $regex: new RegExp(`^${label.trim()}$`, 'i') },
                });
            }
            let isUnknown;
            if (!hasLabel && !is_unknown) {
                isUnknown = false;
            }
            else if (is_unknown) {
                isUnknown = true;
            }
            else if (!defectTypeDoc) {
                isUnknown = true;
                this.logger.warn(`DefectType code "${label}" not found in DB, marking as unknown`);
            }
            else {
                isUnknown = confidence < threshold;
            }
            const activeModel = await this.aiModelModel.findOne({ status: 'active' }).sort({ activatedAt: -1 });
            await this.imageModel.findByIdAndUpdate(imageId, {
                predictedLabel: defectTypeDoc?._id ?? null,
                confidence,
                isUnknown,
                status: isUnknown ? 'pending' : 'approved',
            });
            const inspectionRecord = await this.inspectionModel.create({
                imageId,
                productId,
                location,
                defectType: defectTypeDoc?._id ?? null,
                isDefective: !isUnknown && !!defectTypeDoc,
                isUnknown,
                modelVersion: activeModel?.version ?? 'unknown',
                inspectedAt: new Date(),
            });
            const populatedInspection = await this.inspectionModel
                .findById(inspectionRecord._id)
                .populate('imageId', 'filePath source confidence')
                .populate('defectType', 'code name severity')
                .exec();
            if (populatedInspection) {
                this.eventsGateway.emitInspectionResult(populatedInspection);
            }
            await this.alertsService.analyzeAndAlert(location, defectTypeDoc?._id?.toString());
            this.logger.log(`Inference done for ${imageId}: ${label} (${(confidence * 100).toFixed(1)}%)`);
        }
        catch (err) {
            this.logger.error(`Inference failed for ${imageId}: ${err.message}`);
            await this.imageModel.findByIdAndUpdate(imageId, {
                isUnknown: true,
                status: 'pending',
                note: `AI inference failed: ${err.message}`,
            }).catch(() => { });
            throw err;
        }
    }
};
exports.InferenceProcessor = InferenceProcessor;
__decorate([
    (0, bull_1.Process)(queue_constants_1.JOB_INFERENCE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InferenceProcessor.prototype, "handleInference", null);
exports.InferenceProcessor = InferenceProcessor = InferenceProcessor_1 = __decorate([
    (0, bull_1.Processor)(queue_constants_1.QUEUE_INFERENCE),
    __param(0, (0, mongoose_1.InjectModel)(image_schema_1.Image.name)),
    __param(1, (0, mongoose_1.InjectModel)(inspection_schema_1.Inspection.name)),
    __param(2, (0, mongoose_1.InjectModel)(defect_type_schema_1.DefectType.name)),
    __param(3, (0, mongoose_1.InjectModel)(ai_model_schema_1.AiModel.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        config_1.ConfigService,
        alerts_service_1.AlertsService,
        events_gateway_1.EventsGateway])
], InferenceProcessor);
//# sourceMappingURL=inference.processor.js.map