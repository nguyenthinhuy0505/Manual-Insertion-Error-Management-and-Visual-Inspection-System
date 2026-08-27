import { Model } from 'mongoose';
import type { Queue } from 'bull';
import { ConfigService } from '@nestjs/config';
import { DefectTypesService } from '../defect-types/defect-types.service';
import { EventsGateway } from '../gateway/events.gateway';
export declare class AiModelService {
    private aiModelModel;
    private trainingQueue;
    private defectTypesService;
    private eventsGateway;
    private configService;
    private autoTrainTimeout;
    constructor(aiModelModel: Model<any>, trainingQueue: Queue, defectTypesService: DefectTypesService, eventsGateway: EventsGateway, configService: ConfigService);
    getCurrent(): Promise<any>;
    getHistory(page?: number, limit?: number): Promise<{
        data: any[];
        total: number;
        page: number;
        limit: number;
    }>;
    triggerManualTraining(): Promise<any>;
    getTrainingDataset(): Promise<{
        classes: string[];
        samples: any[];
    }>;
    predict(fileBuffer: Buffer, filename: string): Promise<any>;
    onTrainingComplete(modelId: string, accuracy: number, trainedOn: number): Promise<any>;
    checkAutoTraining(reason?: string): Promise<void>;
    getTrainingProgress(): Promise<any>;
    onTrainingFailed(modelId: string, reason: string): Promise<any>;
    cancelTraining(id: string): Promise<any>;
    deleteModel(id: string): Promise<{
        success: boolean;
    }>;
}
