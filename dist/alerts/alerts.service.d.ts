import { Model } from 'mongoose';
import { Alert, AlertDocument } from './schemas/alert.schema';
import { EventsGateway } from '../gateway/events.gateway';
import { ConfigService } from '@nestjs/config';
export declare class AlertsService {
    private alertModel;
    private inspectionModel;
    private eventsGateway;
    private configService;
    private readonly logger;
    constructor(alertModel: Model<AlertDocument>, inspectionModel: Model<any>, eventsGateway: EventsGateway, configService: ConfigService);
    findAll(page?: number, limit?: number, unreadOnly?: boolean): Promise<{
        data: (import("mongoose").Document<unknown, {}, AlertDocument, {}, import("mongoose").DefaultSchemaOptions> & Alert & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
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
    createAlert(data: {
        type: string;
        severity: string;
        location?: string;
        defectType?: string;
        message: string;
    }): Promise<AlertDocument>;
    analyzeAndAlert(location?: string, defectTypeId?: string): Promise<void>;
    scheduledAnalysis(): Promise<void>;
}
