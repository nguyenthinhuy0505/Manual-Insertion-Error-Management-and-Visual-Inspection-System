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
exports.DefectTypesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const defect_types_service_1 = require("./defect-types.service");
const defect_type_dto_1 = require("./dto/defect-type.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const storage = (0, multer_1.diskStorage)({
    destination: './uploads/defect-samples',
    filename: (_req, file, cb) => {
        const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${unique}${(0, path_1.extname)(file.originalname)}`);
    },
});
const fileFilter = (_req, file, cb) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|bmp|webp)$/)) {
        return cb(new common_1.BadRequestException('Only image files are allowed'), false);
    }
    cb(null, true);
};
let DefectTypesController = class DefectTypesController {
    defectTypesService;
    constructor(defectTypesService) {
        this.defectTypesService = defectTypesService;
    }
    findAll(active) {
        return this.defectTypesService.findAll(active === 'true');
    }
    findOne(id) {
        return this.defectTypesService.findById(id);
    }
    create(dto) {
        return this.defectTypesService.create(dto);
    }
    update(id, dto) {
        return this.defectTypesService.update(id, dto);
    }
    remove(id) {
        return this.defectTypesService.remove(id);
    }
    getSamples(code) {
        return this.defectTypesService.getSamples(code);
    }
    async uploadSample(code, file, req) {
        if (!file)
            throw new common_1.BadRequestException('No file uploaded');
        return this.defectTypesService.uploadSample(code, file, req.user);
    }
    deleteSample(code, filename) {
        return this.defectTypesService.deleteSample(code, filename);
    }
};
exports.DefectTypesController = DefectTypesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('active')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DefectTypesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DefectTypesController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [defect_type_dto_1.CreateDefectTypeDto]),
    __metadata("design:returntype", void 0)
], DefectTypesController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, defect_type_dto_1.UpdateDefectTypeDto]),
    __metadata("design:returntype", void 0)
], DefectTypesController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DefectTypesController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':code/samples'),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DefectTypesController.prototype, "getSamples", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Post)(':code/samples'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                cb(null, `${uniqueSuffix}${ext}`);
            }
        })
    })),
    __param(0, (0, common_1.Param)('code')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], DefectTypesController.prototype, "uploadSample", null);
__decorate([
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.Delete)(':code/samples/:filename'),
    __param(0, (0, common_1.Param)('code')),
    __param(1, (0, common_1.Param)('filename')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], DefectTypesController.prototype, "deleteSample", null);
exports.DefectTypesController = DefectTypesController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('defect-types'),
    __metadata("design:paramtypes", [defect_types_service_1.DefectTypesService])
], DefectTypesController);
//# sourceMappingURL=defect-types.controller.js.map