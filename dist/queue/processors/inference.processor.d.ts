import type { Job } from 'bull';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { ImageDocument } from '../../images/schemas/image.schema';
import { DefectTypeDocument } from '../../defect-types/schemas/defect-type.schema';
import { AlertsService } from '../../alerts/alerts.service';
import { EventsGateway } from '../../gateway/events.gateway';
export declare class InferenceProcessor {
    private imageModel;
    private inspectionModel;
    private defectTypeModel;
    private aiModelModel;
    private configService;
    private alertsService;
    private eventsGateway;
    private readonly logger;
    constructor(imageModel: Model<ImageDocument>, inspectionModel: Model<any>, defectTypeModel: Model<DefectTypeDocument>, aiModelModel: Model<any>, configService: ConfigService, alertsService: AlertsService, eventsGateway: EventsGateway);
    handleInference(job: Job<{
        imageId: string;
        filePath: string;
        productId: string;
        location: string;
    }>): Promise<void>;
}
