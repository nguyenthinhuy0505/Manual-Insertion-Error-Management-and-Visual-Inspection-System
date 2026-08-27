import { InspectionsService } from './inspections.service';
export declare class InspectionsController {
    private readonly inspectionsService;
    constructor(inspectionsService: InspectionsService);
    findAll(page?: string, limit?: string, location?: string, defectType?: string, isDefective?: string, from?: string, to?: string): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/inspection.schema").InspectionDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/inspection.schema").Inspection & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    markAsIncorrect(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/inspection.schema").InspectionDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/inspection.schema").Inspection & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
