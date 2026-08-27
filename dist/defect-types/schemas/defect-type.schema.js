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
exports.DefectTypeSchema = exports.DefectType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let DefectType = class DefectType {
    code;
    name;
    description;
    severity;
    sampleCount;
    lastTrainedSampleCount;
    sampleImages;
    isActive;
};
exports.DefectType = DefectType;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, uppercase: true, trim: true }),
    __metadata("design:type", String)
], DefectType.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], DefectType.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], DefectType.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' }),
    __metadata("design:type", String)
], DefectType.prototype, "severity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], DefectType.prototype, "sampleCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], DefectType.prototype, "lastTrainedSampleCount", void 0);
__decorate([
    (0, mongoose_1.Prop)([{
            filePath: String,
            uploadedBy: { type: mongoose_2.Types.ObjectId, ref: 'User' },
            createdAt: { type: Date, default: Date.now }
        }]),
    __metadata("design:type", Array)
], DefectType.prototype, "sampleImages", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], DefectType.prototype, "isActive", void 0);
exports.DefectType = DefectType = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], DefectType);
exports.DefectTypeSchema = mongoose_1.SchemaFactory.createForClass(DefectType);
//# sourceMappingURL=defect-type.schema.js.map