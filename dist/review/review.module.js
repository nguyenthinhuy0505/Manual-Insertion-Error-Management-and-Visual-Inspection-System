"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const bull_1 = require("@nestjs/bull");
const review_controller_1 = require("./review.controller");
const review_service_1 = require("./review.service");
const image_schema_1 = require("../images/schemas/image.schema");
const ai_model_schema_1 = require("../ai-model/schemas/ai-model.schema");
const defect_types_module_1 = require("../defect-types/defect-types.module");
const queue_constants_1 = require("../queue/queue.constants");
const config_1 = require("@nestjs/config");
let ReviewModule = class ReviewModule {
};
exports.ReviewModule = ReviewModule;
exports.ReviewModule = ReviewModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            defect_types_module_1.DefectTypesModule,
            bull_1.BullModule.registerQueue({ name: queue_constants_1.QUEUE_TRAINING }),
            mongoose_1.MongooseModule.forFeature([
                { name: image_schema_1.Image.name, schema: image_schema_1.ImageSchema },
                { name: ai_model_schema_1.AiModel.name, schema: ai_model_schema_1.AiModelSchema },
            ]),
        ],
        controllers: [review_controller_1.ReviewController],
        providers: [review_service_1.ReviewService],
    })
], ReviewModule);
//# sourceMappingURL=review.module.js.map