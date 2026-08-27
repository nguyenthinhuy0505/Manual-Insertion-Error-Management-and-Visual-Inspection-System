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
exports.ImageSchema = exports.Image = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Image = class Image {
    filePath;
    source;
    productId;
    location;
    uploadedBy;
    status;
    predictedLabel;
    confidence;
    isUnknown;
    reviewedLabel;
    reviewedBy;
    reviewedAt;
    note;
};
exports.Image = Image;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Image.prototype, "filePath", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['aoi_machine', 'inspector'] }),
    __metadata("design:type", String)
], Image.prototype, "source", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Image.prototype, "productId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Image.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', default: null }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Image.prototype, "uploadedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['pending', 'approved', 'rejected'], default: 'pending' }),
    __metadata("design:type", String)
], Image.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'DefectType', default: null }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Image.prototype, "predictedLabel", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, min: 0, max: 1, default: null }),
    __metadata("design:type", Number)
], Image.prototype, "confidence", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Image.prototype, "isUnknown", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'DefectType', default: null }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Image.prototype, "reviewedLabel", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', default: null }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Image.prototype, "reviewedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", Date)
], Image.prototype, "reviewedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ trim: true }),
    __metadata("design:type", String)
], Image.prototype, "note", void 0);
exports.Image = Image = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Image);
exports.ImageSchema = mongoose_1.SchemaFactory.createForClass(Image);
//# sourceMappingURL=image.schema.js.map