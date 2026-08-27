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
exports.InspectionSchema = exports.Inspection = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Inspection = class Inspection {
    imageId;
    productId;
    location;
    defectType;
    isDefective;
    isUnknown;
    isIncorrect;
    modelVersion;
    inspectedAt;
};
exports.Inspection = Inspection;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Image', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Inspection.prototype, "imageId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Inspection.prototype, "productId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Inspection.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'DefectType', default: null }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Inspection.prototype, "defectType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Inspection.prototype, "isDefective", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Inspection.prototype, "isUnknown", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Inspection.prototype, "isIncorrect", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Inspection.prototype, "modelVersion", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Inspection.prototype, "inspectedAt", void 0);
exports.Inspection = Inspection = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Inspection);
exports.InspectionSchema = mongoose_1.SchemaFactory.createForClass(Inspection);
exports.InspectionSchema.index({ location: 1, inspectedAt: -1 });
exports.InspectionSchema.index({ defectType: 1, inspectedAt: -1 });
//# sourceMappingURL=inspection.schema.js.map