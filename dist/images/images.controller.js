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
exports.ImagesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const images_service_1 = require("./images.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const api_key_guard_1 = require("../auth/guards/api-key.guard");
const storage = (0, multer_1.diskStorage)({
    destination: './uploads',
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
let ImagesController = class ImagesController {
    imagesService;
    constructor(imagesService) {
        this.imagesService = imagesService;
    }
    uploadFromDevice(file, req, productId, location) {
        if (!file)
            throw new common_1.BadRequestException('Image file is required');
        return this.imagesService.uploadFromDevice(file, req.user, productId, location);
    }
    uploadFromInspector(file, req, productId, location) {
        if (!file)
            throw new common_1.BadRequestException('Image file is required');
        return this.imagesService.uploadFromInspector(file, req.user, productId, location);
    }
    findAll(status, page = '1', limit = '20') {
        return this.imagesService.findAll({ status, page: +page, limit: +limit });
    }
    findPending(page = '1', limit = '20') {
        return this.imagesService.findAll({ status: 'pending', page: +page, limit: +limit });
    }
    findOne(id) {
        return this.imagesService.findById(id);
    }
};
exports.ImagesController = ImagesController;
__decorate([
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard),
    (0, common_1.Post)('upload/device'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', { storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)('productId')),
    __param(3, (0, common_1.Body)('location')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, String]),
    __metadata("design:returntype", void 0)
], ImagesController.prototype, "uploadFromDevice", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('upload/inspector'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', { storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)('productId')),
    __param(3, (0, common_1.Body)('location')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, String]),
    __metadata("design:returntype", void 0)
], ImagesController.prototype, "uploadFromInspector", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], ImagesController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('pending'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ImagesController.prototype, "findPending", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ImagesController.prototype, "findOne", null);
exports.ImagesController = ImagesController = __decorate([
    (0, common_1.Controller)('images'),
    __metadata("design:paramtypes", [images_service_1.ImagesService])
], ImagesController);
//# sourceMappingURL=images.controller.js.map