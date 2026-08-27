import { Model } from 'mongoose';
import { DefectTypeDocument } from './schemas/defect-type.schema';
import { CreateDefectTypeDto, UpdateDefectTypeDto } from './dto/defect-type.dto';
import { AiModelService } from '../ai-model/ai-model.service';
export declare class DefectTypesService {
    private defectTypeModel;
    private aiModelService;
    constructor(defectTypeModel: Model<DefectTypeDocument>, aiModelService: AiModelService);
    create(dto: CreateDefectTypeDto): Promise<DefectTypeDocument>;
    findAll(activeOnly?: boolean): Promise<DefectTypeDocument[]>;
    findById(id: string): Promise<DefectTypeDocument>;
    findByCode(code: string): Promise<DefectTypeDocument | null>;
    updateLastTrainedSampleCount(id: string, count: number): Promise<void>;
    update(id: string, dto: UpdateDefectTypeDto): Promise<DefectTypeDocument>;
    addSampleFromReview(id: string, filePath: string, uploadedBy: any): Promise<void>;
    remove(id: string): Promise<void>;
    getSamples(code: string): Promise<any[]>;
    uploadSample(code: string, file: Express.Multer.File, user: any): Promise<{
        filePath: string;
    }>;
    deleteSample(code: string, filename: string): Promise<void>;
}
