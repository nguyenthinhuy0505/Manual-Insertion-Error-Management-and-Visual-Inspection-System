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
var TrainingProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainingProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const config_1 = require("@nestjs/config");
const axios_1 = __importDefault(require("axios"));
const queue_constants_1 = require("../queue.constants");
const ai_model_schema_1 = require("../../ai-model/schemas/ai-model.schema");
const events_gateway_1 = require("../../gateway/events.gateway");
let TrainingProcessor = TrainingProcessor_1 = class TrainingProcessor {
    aiModelModel;
    configService;
    eventsGateway;
    logger = new common_1.Logger(TrainingProcessor_1.name);
    constructor(aiModelModel, configService, eventsGateway) {
        this.aiModelModel = aiModelModel;
        this.configService = configService;
        this.eventsGateway = eventsGateway;
    }
    async handleTraining(job) {
        const { modelId, defectTypeIds } = job.data;
        this.logger.log(`Starting training for model ${modelId}`);
        try {
            const aiUrl = this.configService.get('AI_SERVICE_URL');
            const internalKey = this.configService.get('INTERNAL_API_KEY');
            await this.aiModelModel.findByIdAndUpdate(modelId, {
                status: 'training',
                trainStartedAt: new Date(),
            });
            await axios_1.default.post(`${aiUrl}/train`, { model_id: modelId, defect_type_ids: defectTypeIds }, { headers: { 'x-internal-key': internalKey }, timeout: 10000 });
            this.logger.log(`Training job dispatched to AI service for model ${modelId}`);
        }
        catch (err) {
            this.logger.error(`Failed to dispatch training job: ${err.message}`);
            await this.aiModelModel.findByIdAndUpdate(modelId, { status: 'archived' });
            throw err;
        }
    }
};
exports.TrainingProcessor = TrainingProcessor;
__decorate([
    (0, bull_1.Process)(queue_constants_1.JOB_TRAINING),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TrainingProcessor.prototype, "handleTraining", null);
exports.TrainingProcessor = TrainingProcessor = TrainingProcessor_1 = __decorate([
    (0, bull_1.Processor)(queue_constants_1.QUEUE_TRAINING),
    __param(0, (0, mongoose_1.InjectModel)(ai_model_schema_1.AiModel.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService,
        events_gateway_1.EventsGateway])
], TrainingProcessor);
//# sourceMappingURL=training.processor.js.map