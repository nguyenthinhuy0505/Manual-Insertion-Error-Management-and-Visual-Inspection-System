import { Model } from 'mongoose';
import type { Queue } from 'bull';
import { ImageDocument } from '../images/schemas/image.schema';
import { DefectTypesService } from '../defect-types/defect-types.service';
import { ConfigService } from '@nestjs/config';
export declare class ReviewService {
    private imageModel;
    private aiModelModel;
    private trainingQueue;
    private defectTypesService;
    private configService;
    constructor(imageModel: Model<ImageDocument>, aiModelModel: Model<any>, trainingQueue: Queue, defectTypesService: DefectTypesService, configService: ConfigService);
    approve(imageId: string, defectTypeCode: string | null, reviewerId: string): Promise<ImageDocument>;
    reject(imageId: string, reviewerId: string, note?: string): Promise<ImageDocument>;
    private triggerTraining;
}
