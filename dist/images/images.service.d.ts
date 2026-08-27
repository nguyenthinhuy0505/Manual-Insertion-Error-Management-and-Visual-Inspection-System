import { Model } from 'mongoose';
import type { Queue } from 'bull';
import { Image, ImageDocument } from './schemas/image.schema';
import { EventsGateway } from '../gateway/events.gateway';
export declare class ImagesService {
    private imageModel;
    private inferenceQueue;
    private eventsGateway;
    constructor(imageModel: Model<ImageDocument>, inferenceQueue: Queue, eventsGateway: EventsGateway);
    uploadFromDevice(file: Express.Multer.File, user: any, productId: string, location: string): Promise<ImageDocument>;
    uploadFromInspector(file: Express.Multer.File, user: any, productId: string, location: string): Promise<ImageDocument>;
    findAll(options: {
        status?: string;
        page: number;
        limit: number;
    }): Promise<{
        data: (import("mongoose").Document<unknown, {}, ImageDocument, {}, import("mongoose").DefaultSchemaOptions> & Image & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    findById(id: string): Promise<ImageDocument>;
    updatePrediction(imageId: string, predictedLabel: string | null, confidence: number, isUnknown: boolean): Promise<void>;
}
