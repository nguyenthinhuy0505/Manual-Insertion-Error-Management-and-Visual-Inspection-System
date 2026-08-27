"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiModelModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const bull_1 = require("@nestjs/bull");
const ai_model_controller_1 = require("./ai-model.controller");
const ai_model_service_1 = require("./ai-model.service");
const ai_model_schema_1 = require("./schemas/ai-model.schema");
const defect_types_module_1 = require("../defect-types/defect-types.module");
const gateway_module_1 = require("../gateway/gateway.module");
const queue_constants_1 = require("../queue/queue.constants");
const config_1 = require("@nestjs/config");
const users_module_1 = require("../users/users.module");
let AiModelModule = class AiModelModule {
};
exports.AiModelModule = AiModelModule;
exports.AiModelModule = AiModelModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            (0, common_1.forwardRef)(() => defect_types_module_1.DefectTypesModule),
            gateway_module_1.GatewayModule,
            users_module_1.UsersModule,
            bull_1.BullModule.registerQueue({ name: queue_constants_1.QUEUE_TRAINING }),
            mongoose_1.MongooseModule.forFeature([{ name: ai_model_schema_1.AiModel.name, schema: ai_model_schema_1.AiModelSchema }]),
        ],
        controllers: [ai_model_controller_1.AiModelController],
        providers: [ai_model_service_1.AiModelService],
        exports: [ai_model_service_1.AiModelService],
    })
], AiModelModule);
//# sourceMappingURL=ai-model.module.js.map