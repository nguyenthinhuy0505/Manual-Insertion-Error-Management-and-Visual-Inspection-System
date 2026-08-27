import { AiModelService } from './ai-model.service';
declare class TrainingCompleteDto {
    modelId: string;
    accuracy: number;
    trainedOn: number;
}
declare class TrainingFailedDto {
    modelId: string;
    reason: string;
}
export declare class AiModelController {
    private readonly aiModelService;
    constructor(aiModelService: AiModelService);
    getCurrent(): Promise<any>;
    predict(file: Express.Multer.File): Promise<any>;
    getHistory(page?: string, limit?: string): Promise<{
        data: any[];
        total: number;
        page: number;
        limit: number;
    }>;
    triggerTraining(): Promise<any>;
    getProgress(): Promise<any>;
    cancelTraining(id: string): Promise<any>;
    deleteModel(id: string): Promise<{
        success: boolean;
    }>;
    getDataset(): Promise<{
        classes: string[];
        samples: any[];
    }>;
    trainingComplete(dto: TrainingCompleteDto): Promise<any>;
    trainingFailed(dto: TrainingFailedDto): Promise<any>;
}
export {};
