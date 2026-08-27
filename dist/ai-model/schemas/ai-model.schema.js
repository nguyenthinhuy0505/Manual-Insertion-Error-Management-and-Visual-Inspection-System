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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiModelSchema = exports.AiModel = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AiModel = class AiModel {
    version;
    status;
    accuracy;
    trainedOn;
    defectTypes;
    trainStartedAt;
    trainCompletedAt;
    activatedAt;
    reason;
    retryCount;
};
exports.AiModel = AiModel;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], AiModel.prototype, "version", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['training', 'active', 'archived'], default: 'training' }),
    __metadata("design:type", String)
], AiModel.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, min: 0, max: 1, default: null }),
    __metadata("design:type", Number)
], AiModel.prototype, "accuracy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], AiModel.prototype, "trainedOn", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_2.Types.ObjectId, ref: 'DefectType' }], default: [] }),
    __metadata("design:type", Array)
], AiModel.prototype, "defectTypes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", Date)
], AiModel.prototype, "trainStartedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", Date)
], AiModel.prototype, "trainCompletedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", Date)
], AiModel.prototype, "activatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], AiModel.prototype, "reason", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], AiModel.prototype, "retryCount", void 0);
exports.AiModel = AiModel = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], AiModel);
exports.AiModelSchema = mongoose_1.SchemaFactory.createForClass(AiModel);
//# sourceMappingURL=ai-model.schema.js.map