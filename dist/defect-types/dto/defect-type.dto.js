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
exports.UpdateDefectTypeDto = exports.CreateDefectTypeDto = void 0;
const class_validator_1 = require("class-validator");
class CreateDefectTypeDto {
    code;
    name;
    description;
    severity;
}
exports.CreateDefectTypeDto = CreateDefectTypeDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^[A-Z0-9_]+$/, { message: 'Code must be uppercase letters, numbers or underscore' }),
    __metadata("design:type", String)
], CreateDefectTypeDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateDefectTypeDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDefectTypeDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['low', 'medium', 'high', 'critical']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateDefectTypeDto.prototype, "severity", void 0);
class UpdateDefectTypeDto {
    name;
    description;
    severity;
    isActive;
}
exports.UpdateDefectTypeDto = UpdateDefectTypeDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], UpdateDefectTypeDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDefectTypeDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['low', 'medium', 'high', 'critical']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateDefectTypeDto.prototype, "severity", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateDefectTypeDto.prototype, "isActive", void 0);
//# sourceMappingURL=defect-type.dto.js.map