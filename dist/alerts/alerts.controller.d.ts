import { AlertsService } from './alerts.service';
export declare class AlertsController {
    private readonly alertsService;
    constructor(alertsService: AlertsService);
    findAll(page?: string, limit?: string, unread?: string): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/alert.schema").AlertDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/alert.schema").Alert & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    markRead(id: string): Promise<void>;
    markAllRead(): Promise<void>;
}
