import { Model } from 'mongoose';
import { Inspection, InspectionDocument } from './schemas/inspection.schema';
import { ImageDocument } from '../images/schemas/image.schema';
import { AiModelDocument } from '../ai-model/schemas/ai-model.schema';
import { AlertDocument } from '../alerts/schemas/alert.schema';
import { EventsGateway } from '../gateway/events.gateway';
export declare class InspectionsService {
    private inspectionModel;
    private imageModel;
    private aiModelModel;
    private alertModel;
    private eventsGateway;
    private readonly logger;
    constructor(inspectionModel: Model<InspectionDocument>, imageModel: Model<ImageDocument>, aiModelModel: Model<AiModelDocument>, alertModel: Model<AlertDocument>, eventsGateway: EventsGateway);
    findAll(options: {
        page: number;
        limit: number;
        location?: string;
        defectType?: string;
        isDefective?: boolean;
        from?: string;
        to?: string;
    }): Promise<{
        data: (import("mongoose").Document<unknown, {}, InspectionDocument, {}, import("mongoose").DefaultSchemaOptions> & Inspection & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    markAsIncorrect(id: string): Promise<import("mongoose").Document<unknown, {}, InspectionDocument, {}, import("mongoose").DefaultSchemaOptions> & Inspection & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getStats(from?: string, to?: string): Promise<{
        total: number;
        defective: number;
        defectRate: number;
        byDefectType: any[];
        byLine: any[];
        byDay: any[];
    }>;
}
