"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const bull_1 = require("@nestjs/bull");
const images_controller_1 = require("./images.controller");
const images_service_1 = require("./images.service");
const image_schema_1 = require("./schemas/image.schema");
const users_module_1 = require("../users/users.module");
const queue_constants_1 = require("../queue/queue.constants");
const config_1 = require("@nestjs/config");
const gateway_module_1 = require("../gateway/gateway.module");
let ImagesModule = class ImagesModule {
};
exports.ImagesModule = ImagesModule;
exports.ImagesModule = ImagesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            users_module_1.UsersModule,
            gateway_module_1.GatewayModule,
            bull_1.BullModule.registerQueue({ name: queue_constants_1.QUEUE_INFERENCE }),
            mongoose_1.MongooseModule.forFeature([{ name: image_schema_1.Image.name, schema: image_schema_1.ImageSchema }]),
        ],
        controllers: [images_controller_1.ImagesController],
        providers: [images_service_1.ImagesService],
        exports: [images_service_1.ImagesService],
    })
], ImagesModule);
//# sourceMappingURL=images.module.js.map