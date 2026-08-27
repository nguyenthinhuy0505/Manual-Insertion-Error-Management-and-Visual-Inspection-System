import { ImagesService } from './images.service';
export declare class ImagesController {
    private readonly imagesService;
    constructor(imagesService: ImagesService);
    uploadFromDevice(file: Express.Multer.File, req: any, productId: string, location: string): Promise<import("./schemas/image.schema").ImageDocument>;
    uploadFromInspector(file: Express.Multer.File, req: any, productId: string, location: string): Promise<import("./schemas/image.schema").ImageDocument>;
    findAll(status?: string, page?: string, limit?: string): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/image.schema").ImageDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/image.schema").Image & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findPending(page?: string, limit?: string): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/image.schema").ImageDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/image.schema").Image & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        } & {
            id: string;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("./schemas/image.schema").ImageDocument>;
}
