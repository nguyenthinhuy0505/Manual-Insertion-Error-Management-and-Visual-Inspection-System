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
var InspectionsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InspectionsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const inspection_schema_1 = require("./schemas/inspection.schema");
const image_schema_1 = require("../images/schemas/image.schema");
const ai_model_schema_1 = require("../ai-model/schemas/ai-model.schema");
const alert_schema_1 = require("../alerts/schemas/alert.schema");
const events_gateway_1 = require("../gateway/events.gateway");
let InspectionsService = InspectionsService_1 = class InspectionsService {
    inspectionModel;
    imageModel;
    aiModelModel;
    alertModel;
    eventsGateway;
    logger = new common_1.Logger(InspectionsService_1.name);
    constructor(inspectionModel, imageModel, aiModelModel, alertModel, eventsGateway) {
        this.inspectionModel = inspectionModel;
        this.imageModel = imageModel;
        this.aiModelModel = aiModelModel;
        this.alertModel = alertModel;
        this.eventsGateway = eventsGateway;
    }
    async findAll(options) {
        const filter = {};
        if (options.location)
            filter.location = options.location;
        if (options.defectType)
            filter.defectType = options.defectType;
        if (options.isDefective !== undefined)
            filter.isDefective = options.isDefective;
        if (options.from || options.to) {
            filter.inspectedAt = {};
            if (options.from)
                filter.inspectedAt.$gte = new Date(options.from);
            if (options.to)
                filter.inspectedAt.$lte = new Date(options.to);
        }
        const skip = (options.page - 1) * options.limit;
        const [data, total] = await Promise.all([
            this.inspectionModel
                .find(filter)
                .populate('imageId', 'filePath source confidence')
                .populate('defectType', 'code name severity')
                .sort({ inspectedAt: -1 })
                .skip(skip)
                .limit(options.limit)
                .exec(),
            this.inspectionModel.countDocuments(filter),
        ]);
        return { data, total, page: options.page, limit: options.limit };
    }
    async markAsIncorrect(id) {
        const inspection = await this.inspectionModel.findById(id);
        if (!inspection)
            throw new common_1.NotFoundException('Inspection not found');
        if (inspection.isIncorrect)
            return inspection;
        inspection.isIncorrect = true;
        await inspection.save();
        await this.imageModel.findByIdAndUpdate(inspection.imageId, {
            status: 'pending',
            isUnknown: true,
        });
        this.eventsGateway.server.emit('imagePendingCountUpdate');
        const activeModel = await this.aiModelModel.findOne({ status: 'active' });
        if (activeModel) {
            const [total, incorrect] = await Promise.all([
                this.inspectionModel.countDocuments({ modelVersion: activeModel.version }),
                this.inspectionModel.countDocuments({ modelVersion: activeModel.version, isIncorrect: true }),
            ]);
            if (total >= 10) {
                const accuracy = (total - incorrect) / total;
                if (accuracy < 0.90) {
                    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
                    const recentAlert = await this.alertModel.findOne({
                        type: 'model_retrain_needed',
                        createdAt: { $gte: oneDayAgo },
                    });
                    if (!recentAlert) {
                        const alert = await this.alertModel.create({
                            type: 'model_retrain_needed',
                            severity: 'critical',
                            message: `Mô hình AI hiện tại (v${activeModel.version}) đang có độ chính xác dưới mức quy định (${(accuracy * 100).toFixed(1)}% < 90%). Yêu cầu huấn luyện lại bằng các dữ liệu đã được đính chính.`,
                        });
                        this.eventsGateway.emitAlert(alert);
                        this.logger.warn(`Generated model_retrain_needed alert. Accuracy: ${(accuracy * 100).toFixed(1)}%`);
                    }
                }
            }
        }
        return inspection;
    }
    async getStats(from, to) {
        const dateFilter = {};
        if (from || to) {
            dateFilter.inspectedAt = {};
            if (from)
                dateFilter.inspectedAt.$gte = new Date(from);
            if (to)
                dateFilter.inspectedAt.$lte = new Date(to);
        }
        const [totalCount, defectiveCount, byDefectType, byLine, byDay] = await Promise.all([
            this.inspectionModel.countDocuments(dateFilter),
            this.inspectionModel.countDocuments({ ...dateFilter, isDefective: true }),
            this.inspectionModel.aggregate([
                { $match: { ...dateFilter, isDefective: true } },
                { $group: { _id: '$defectType', count: { $sum: 1 } } },
                { $lookup: { from: 'defecttypes', localField: '_id', foreignField: '_id', as: 'defectType' } },
                { $unwind: { path: '$defectType', preserveNullAndEmptyArrays: true } },
                { $project: { code: '$defectType.code', name: '$defectType.name', count: 1 } },
                { $sort: { count: -1 } },
            ]),
            this.inspectionModel.aggregate([
                { $match: dateFilter },
                {
                    $group: {
                        _id: '$location',
                        total: { $sum: 1 },
                        defective: { $sum: { $cond: ['$isDefective', 1, 0] } },
                    },
                },
                { $sort: { total: -1 } },
            ]),
            this.inspectionModel.aggregate([
                { $match: dateFilter },
                {
                    $group: {
                        _id: { $dateToString: { format: '%Y-%m-%d', date: '$inspectedAt' } },
                        total: { $sum: 1 },
                        defective: { $sum: { $cond: ['$isDefective', 1, 0] } },
                    },
                },
                { $sort: { _id: 1 } },
            ]),
        ]);
        return {
            total: totalCount,
            defective: defectiveCount,
            defectRate: totalCount > 0 ? (defectiveCount / totalCount) : 0,
            byDefectType,
            byLine,
            byDay,
        };
    }
};
exports.InspectionsService = InspectionsService;
exports.InspectionsService = InspectionsService = InspectionsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(inspection_schema_1.Inspection.name)),
    __param(1, (0, mongoose_1.InjectModel)(image_schema_1.Image.name)),
    __param(2, (0, mongoose_1.InjectModel)(ai_model_schema_1.AiModel.name)),
    __param(3, (0, mongoose_1.InjectModel)(alert_schema_1.Alert.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        events_gateway_1.EventsGateway])
], InspectionsService);
//# sourceMappingURL=inspections.service.js.map