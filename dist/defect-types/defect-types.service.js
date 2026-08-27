"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefectTypesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const defect_type_schema_1 = require("./schemas/defect-type.schema");
const ai_model_service_1 = require("../ai-model/ai-model.service");
let DefectTypesService = class DefectTypesService {
    defectTypeModel;
    aiModelService;
    constructor(defectTypeModel, aiModelService) {
        this.defectTypeModel = defectTypeModel;
        this.aiModelService = aiModelService;
    }
    async create(dto) {
        const exists = await this.defectTypeModel.findOne({ code: dto.code.toUpperCase() });
        if (exists)
            throw new common_1.ConflictException(`Defect type with code "${dto.code}" already exists`);
        return this.defectTypeModel.create(dto);
    }
    async findAll(activeOnly = false) {
        const filter = activeOnly ? { isActive: true } : {};
        return this.defectTypeModel.find(filter).sort({ code: 1 }).exec();
    }
    async findById(id) {
        const found = await this.defectTypeModel.findById(id);
        if (!found)
            throw new common_1.NotFoundException('Defect type not found');
        return found;
    }
    async findByCode(code) {
        return this.defectTypeModel.findOne({ code: code.toUpperCase() });
    }
    async updateLastTrainedSampleCount(id, count) {
        await this.defectTypeModel.findByIdAndUpdate(id, { lastTrainedSampleCount: count });
    }
    async update(id, dto) {
        const oldDefect = await this.findById(id);
        const updated = await this.defectTypeModel.findByIdAndUpdate(id, dto, { new: true });
        if (!updated)
            throw new common_1.NotFoundException('Defect type not found');
        if (oldDefect.isActive !== updated.isActive) {
            await this.aiModelService.checkAutoTraining(`Trạng thái của loại lỗi ${updated.code} đã thay đổi`);
        }
        else if (updated.isActive) {
            const infoChanged = oldDefect.name !== updated.name || oldDefect.description !== updated.description || oldDefect.severity !== updated.severity;
            if (infoChanged) {
                await this.aiModelService.checkAutoTraining(`Thông tin của loại lỗi ${updated.code} đã thay đổi`);
            }
        }
        return updated;
    }
    async addSampleFromReview(id, filePath, uploadedBy) {
        await this.defectTypeModel.findByIdAndUpdate(id, {
            $push: { sampleImages: { filePath, uploadedBy } },
            $inc: { sampleCount: 1 }
        });
        this.aiModelService.checkAutoTraining();
    }
    async remove(id) {
        const oldDefect = await this.findById(id);
        const result = await this.defectTypeModel.findByIdAndDelete(id);
        if (!result)
            throw new common_1.NotFoundException('Defect type not found');
        if (oldDefect.isActive) {
            await this.aiModelService.checkAutoTraining(`Loại lỗi ${oldDefect.code} đã bị xoá`);
        }
    }
    async getSamples(code) {
        const defectType = await this.defectTypeModel
            .findOne({ code: code.toUpperCase() })
            .populate('sampleImages.uploadedBy', 'username role')
            .exec();
        return defectType?.sampleImages || [];
    }
    async uploadSample(code, file, user) {
        const defectType = await this.findByCode(code);
        if (!defectType) {
            if (fs.existsSync(file.path))
                fs.unlinkSync(file.path);
            throw new common_1.NotFoundException('Defect type not found');
        }
        const relativePath = `uploads/${file.filename}`;
        await this.defectTypeModel.findByIdAndUpdate(defectType._id, {
            $push: { sampleImages: { filePath: relativePath, uploadedBy: user._id } },
            $inc: { sampleCount: 1 }
        });
        this.aiModelService.checkAutoTraining();
        return { filePath: relativePath };
    }
    async deleteSample(code, filename) {
        const defectType = await this.findByCode(code);
        if (!defectType)
            return;
        const relativePath = `uploads/${filename}`;
        const filePath = path.join('./', relativePath);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        await this.defectTypeModel.findByIdAndUpdate(defectType._id, {
            $pull: { sampleImages: { filePath: relativePath } },
            $inc: { sampleCount: -1 }
        });
        this.aiModelService.checkAutoTraining();
    }
};
exports.DefectTypesService = DefectTypesService;
exports.DefectTypesService = DefectTypesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(defect_type_schema_1.DefectType.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => ai_model_service_1.AiModelService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        ai_model_service_1.AiModelService])
], DefectTypesService);
//# sourceMappingURL=defect-types.service.js.map