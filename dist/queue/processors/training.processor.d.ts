import type { Job } from 'bull';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { EventsGateway } from '../../gateway/events.gateway';
export declare class TrainingProcessor {
    private aiModelModel;
    private configService;
    private eventsGateway;
    private readonly logger;
    constructor(aiModelModel: Model<any>, configService: ConfigService, eventsGateway: EventsGateway);
    handleTraining(job: Job<{
        modelId: string;
        defectTypeIds: string[];
    }>): Promise<void>;
}
