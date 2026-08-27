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
var AlertsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schedule_1 = require("@nestjs/schedule");
const alert_schema_1 = require("./schemas/alert.schema");
const inspection_schema_1 = require("../inspections/schemas/inspection.schema");
const events_gateway_1 = require("../gateway/events.gateway");
const config_1 = require("@nestjs/config");
let AlertsService = AlertsService_1 = class AlertsService {
    alertModel;
    inspectionModel;
    eventsGateway;
    configService;
    logger = new common_1.Logger(AlertsService_1.name);
    constructor(alertModel, inspectionModel, eventsGateway, configService) {
        this.alertModel = alertModel;
        this.inspectionModel = inspectionModel;
        this.eventsGateway = eventsGateway;
        this.configService = configService;
    }
    async findAll(page = 1, limit = 20, unreadOnly = false) {
        const filter = {};
        if (unreadOnly)
            filter.isRead = false;
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.alertModel
                .find(filter)
                .populate('defectType', 'code name')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            this.alertModel.countDocuments(filter),
        ]);
        return { data, total, page, limit };
    }
    async markRead(id) {
        await this.alertModel.findByIdAndUpdate(id, { isRead: true });
    }
    async markAllRead() {
        await this.alertModel.updateMany({ isRead: false }, { isRead: true });
    }
    async createAlert(data) {
        const alert = await this.alertModel.create(data);
        const populated = await this.alertModel.findById(alert._id).populate('defectType', 'code name');
        this.eventsGateway.emitAlert(populated);
        return alert;
    }
    async analyzeAndAlert(location, defectTypeId) {
        if (!location)
            return;
        try {
            const now = new Date();
            const thirtyMinsAgo = new Date(now.getTime() - 30 * 60 * 1000);
            const total = await this.inspectionModel.countDocuments({
                location,
                inspectedAt: { $gte: thirtyMinsAgo },
            });
            if (total < 10)
                return;
            const defectCount = await this.inspectionModel.countDocuments({
                location,
                isDefective: true,
                inspectedAt: { $gte: thirtyMinsAgo },
            });
            const rate = defectCount / total;
            const threshold = this.configService.get('DEFECT_RATE_ALERT_THRESHOLD') ?? 0.3;
            if (rate >= threshold) {
                const recentAlert = await this.alertModel.findOne({
                    type: 'defect_rate_high',
                    location,
                    createdAt: { $gte: thirtyMinsAgo },
                });
                if (!recentAlert) {
                    await this.createAlert({
                        type: 'defect_rate_high',
                        severity: 'high',
                        location,
                        message: `Tỷ lệ lỗi tại ${location} đang ở mức ${(rate * 100).toFixed(1)}% (vượt ngưỡng ${(threshold * 100).toFixed(1)}%)`,
                    });
                    this.logger.warn(`Alert generated: High defect rate at ${location}`);
                }
            }
        }
        catch (error) {
            this.logger.error('Error in analyzeAndAlert', error);
        }
    }
    async scheduledAnalysis() {
        this.logger.log('Running scheduled defect rate analysis...');
        const locations = await this.inspectionModel.distinct('location');
        for (const loc of locations) {
            await this.analyzeAndAlert(loc);
        }
    }
};
exports.AlertsService = AlertsService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_30_MINUTES),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AlertsService.prototype, "scheduledAnalysis", null);
exports.AlertsService = AlertsService = AlertsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(alert_schema_1.Alert.name)),
    __param(1, (0, mongoose_1.InjectModel)(inspection_schema_1.Inspection.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        events_gateway_1.EventsGateway,
        config_1.ConfigService])
], AlertsService);
//# sourceMappingURL=alerts.service.js.map