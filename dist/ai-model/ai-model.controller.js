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
exports.AiModelController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const ai_model_service_1 = require("./ai-model.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const internal_key_guard_1 = require("../auth/guards/internal-key.guard");
const api_key_guard_1 = require("../auth/guards/api-key.guard");
const class_validator_1 = require("class-validator");
class TrainingCompleteDto {
    modelId;
    accuracy;
    trainedOn;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TrainingCompleteDto.prototype, "modelId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TrainingCompleteDto.prototype, "accuracy", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TrainingCompleteDto.prototype, "trainedOn", void 0);
class TrainingFailedDto {
    modelId;
    reason;
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TrainingFailedDto.prototype, "modelId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TrainingFailedDto.prototype, "reason", void 0);
let AiModelController = class AiModelController {
    aiModelService;
    constructor(aiModelService) {
        this.aiModelService = aiModelService;
    }
    getCurrent() {
        return this.aiModelService.getCurrent();
    }
    async predict(file) {
        if (!file) {
            throw new common_1.BadRequestException('Vui lòng upload ảnh (image)');
        }
        return this.aiModelService.predict(file.buffer, file.originalname);
    }
    getHistory(page = '1', limit = '10') {
        return this.aiModelService.getHistory(+page, +limit);
    }
    triggerTraining() {
        return this.aiModelService.triggerManualTraining();
    }
    getProgress() {
        return this.aiModelService.getTrainingProgress();
    }
    cancelTraining(id) {
        return this.aiModelService.cancelTraining(id);
    }
    deleteModel(id) {
        return this.aiModelService.deleteModel(id);
    }
    getDataset() {
        return this.aiModelService.getTrainingDataset();
    }
    trainingComplete(dto) {
        return this.aiModelService.onTrainingComplete(dto.modelId, dto.accuracy, dto.trainedOn);
    }
    trainingFailed(dto) {
        return this.aiModelService.onTrainingFailed(dto.modelId, dto.reason);
    }
};
exports.AiModelController = AiModelController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('current'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AiModelController.prototype, "getCurrent", null);
__decorate([
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard),
    (0, common_1.Post)('predict'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiModelController.prototype, "predict", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('history'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AiModelController.prototype, "getHistory", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Post)('trigger-training'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AiModelController.prototype, "triggerTraining", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('progress'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AiModelController.prototype, "getProgress", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Post)(':id/cancel'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AiModelController.prototype, "cancelTraining", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AiModelController.prototype, "deleteModel", null);
__decorate([
    (0, common_1.UseGuards)(internal_key_guard_1.InternalKeyGuard),
    (0, common_1.Get)('dataset'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AiModelController.prototype, "getDataset", null);
__decorate([
    (0, common_1.UseGuards)(internal_key_guard_1.InternalKeyGuard),
    (0, common_1.Post)('training-complete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TrainingCompleteDto]),
    __metadata("design:returntype", void 0)
], AiModelController.prototype, "trainingComplete", null);
__decorate([
    (0, common_1.UseGuards)(internal_key_guard_1.InternalKeyGuard),
    (0, common_1.Post)('training-failed'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [TrainingFailedDto]),
    __metadata("design:returntype", void 0)
], AiModelController.prototype, "trainingFailed", null);
exports.AiModelController = AiModelController = __decorate([
    (0, common_1.Controller)('ai-model'),
    __metadata("design:paramtypes", [ai_model_service_1.AiModelService])
], AiModelController);
//# sourceMappingURL=ai-model.controller.js.map