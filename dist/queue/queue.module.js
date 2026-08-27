"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueModule = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const queue_constants_1 = require("./queue.constants");
const inference_processor_1 = require("./processors/inference.processor");
const training_processor_1 = require("./processors/training.processor");
const image_schema_1 = require("../images/schemas/image.schema");
const inspection_schema_1 = require("../inspections/schemas/inspection.schema");
const defect_type_schema_1 = require("../defect-types/schemas/defect-type.schema");
const ai_model_schema_1 = require("../ai-model/schemas/ai-model.schema");
const alerts_module_1 = require("../alerts/alerts.module");
const gateway_module_1 = require("../gateway/gateway.module");
let QueueModule = class QueueModule {
};
exports.QueueModule = QueueModule;
exports.QueueModule = QueueModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            alerts_module_1.AlertsModule,
            gateway_module_1.GatewayModule,
            bull_1.BullModule.registerQueue({ name: queue_constants_1.QUEUE_INFERENCE }, { name: queue_constants_1.QUEUE_TRAINING }),
            mongoose_1.MongooseModule.forFeature([
                { name: image_schema_1.Image.name, schema: image_schema_1.ImageSchema },
                { name: inspection_schema_1.Inspection.name, schema: inspection_schema_1.InspectionSchema },
                { name: defect_type_schema_1.DefectType.name, schema: defect_type_schema_1.DefectTypeSchema },
                { name: ai_model_schema_1.AiModel.name, schema: ai_model_schema_1.AiModelSchema },
            ]),
        ],
        providers: [inference_processor_1.InferenceProcessor, training_processor_1.TrainingProcessor],
        exports: [bull_1.BullModule],
    })
], QueueModule);
//# sourceMappingURL=queue.module.js.map