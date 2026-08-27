"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InspectionsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const inspections_controller_1 = require("./inspections.controller");
const inspections_service_1 = require("./inspections.service");
const inspection_schema_1 = require("./schemas/inspection.schema");
const image_schema_1 = require("../images/schemas/image.schema");
const ai_model_schema_1 = require("../ai-model/schemas/ai-model.schema");
const alert_schema_1 = require("../alerts/schemas/alert.schema");
const gateway_module_1 = require("../gateway/gateway.module");
let InspectionsModule = class InspectionsModule {
};
exports.InspectionsModule = InspectionsModule;
exports.InspectionsModule = InspectionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: inspection_schema_1.Inspection.name, schema: inspection_schema_1.InspectionSchema },
                { name: image_schema_1.Image.name, schema: image_schema_1.ImageSchema },
                { name: ai_model_schema_1.AiModel.name, schema: ai_model_schema_1.AiModelSchema },
                { name: alert_schema_1.Alert.name, schema: alert_schema_1.AlertSchema },
            ]),
            gateway_module_1.GatewayModule,
        ],
        controllers: [inspections_controller_1.InspectionsController],
        providers: [inspections_service_1.InspectionsService],
        exports: [inspections_service_1.InspectionsService],
    })
], InspectionsModule);
//# sourceMappingURL=inspections.module.js.map