"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefectTypesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const defect_types_controller_1 = require("./defect-types.controller");
const defect_types_service_1 = require("./defect-types.service");
const defect_type_schema_1 = require("./schemas/defect-type.schema");
const ai_model_module_1 = require("../ai-model/ai-model.module");
let DefectTypesModule = class DefectTypesModule {
};
exports.DefectTypesModule = DefectTypesModule;
exports.DefectTypesModule = DefectTypesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: defect_type_schema_1.DefectType.name, schema: defect_type_schema_1.DefectTypeSchema }]),
            (0, common_1.forwardRef)(() => ai_model_module_1.AiModelModule),
        ],
        controllers: [defect_types_controller_1.DefectTypesController],
        providers: [defect_types_service_1.DefectTypesService],
        exports: [defect_types_service_1.DefectTypesService],
    })
], DefectTypesModule);
//# sourceMappingURL=defect-types.module.js.map