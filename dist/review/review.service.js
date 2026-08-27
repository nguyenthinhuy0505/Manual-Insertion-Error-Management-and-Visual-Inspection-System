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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bull_1 = require("@nestjs/bull");
const image_schema_1 = require("../images/schemas/image.schema");
const defect_types_service_1 = require("../defect-types/defect-types.service");
const ai_model_schema_1 = require("../ai-model/schemas/ai-model.schema");
const queue_constants_1 = require("../queue/queue.constants");
const config_1 = require("@nestjs/config");
let ReviewService = class ReviewService {
    imageModel;
    aiModelModel;
    trainingQueue;
    defectTypesService;
    configService;
    constructor(imageModel, aiModelModel, trainingQueue, defectTypesService, configService) {
        this.imageModel = imageModel;
        this.aiModelModel = aiModelModel;
        this.trainingQueue = trainingQueue;
        this.defectTypesService = defectTypesService;
        this.configService = configService;
    }
    async approve(imageId, defectTypeCode, reviewerId) {
        const image = await this.imageModel.findById(imageId);
        if (!image)
            throw new common_1.NotFoundException('Image not found');
        if (image.status !== 'pending')
            throw new common_1.BadRequestException('Image already reviewed');
        let defectTypeId = null;
        if (defectTypeCode) {
            const defectType = await this.defectTypesService.findByCode(defectTypeCode);
            if (!defectType)
                throw new common_1.NotFoundException(`Defect type "${defectTypeCode}" not found`);
            defectTypeId = defectType._id;
            await this.defectTypesService.addSampleFromReview(defectType._id.toString(), image.filePath, image.uploadedBy);
            const threshold = this.configService.get('TRAINING_THRESHOLD') ?? 20;
            const updated = await this.defectTypesService.findById(defectType._id.toString());
            if (updated.sampleCount >= threshold && updated.sampleCount % threshold === 0) {
                await this.triggerTraining();
            }
        }
        const updated = await this.imageModel.findByIdAndUpdate(imageId, {
            status: 'approved',
            reviewedLabel: defectTypeId,
            reviewedBy: reviewerId,
            reviewedAt: new Date(),
        }, { new: true }).populate('reviewedLabel reviewedBy');
        return updated;
    }
    async reject(imageId, reviewerId, note) {
        const image = await this.imageModel.findById(imageId);
        if (!image)
            throw new common_1.NotFoundException('Image not found');
        if (image.status !== 'pending')
            throw new common_1.BadRequestException('Image already reviewed');
        const updated = await this.imageModel.findByIdAndUpdate(imageId, { status: 'rejected', reviewedBy: reviewerId, reviewedAt: new Date(), note }, { new: true });
        return updated;
    }
    async triggerTraining() {
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
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(image_schema_1.Image.name)),
    __param(1, (0, mongoose_1.InjectModel)(ai_model_schema_1.AiModel.name)),
    __param(2, (0, bull_1.InjectQueue)(queue_constants_1.QUEUE_TRAINING)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model, Object, defect_types_service_1.DefectTypesService,
        config_1.ConfigService])
], ReviewService);
//# sourceMappingURL=review.service.js.map