import { DefectTypesService } from './defect-types.service';
import { CreateDefectTypeDto, UpdateDefectTypeDto } from './dto/defect-type.dto';
export declare class DefectTypesController {
    private readonly defectTypesService;
    constructor(defectTypesService: DefectTypesService);
    findAll(active?: string): Promise<import("./schemas/defect-type.schema").DefectTypeDocument[]>;
    findOne(id: string): Promise<import("./schemas/defect-type.schema").DefectTypeDocument>;
    create(dto: CreateDefectTypeDto): Promise<import("./schemas/defect-type.schema").DefectTypeDocument>;
    update(id: string, dto: UpdateDefectTypeDto): Promise<import("./schemas/defect-type.schema").DefectTypeDocument>;
    remove(id: string): Promise<void>;
    getSamples(code: string): Promise<any[]>;
    uploadSample(code: string, file: Express.Multer.File, req: any): Promise<{
        filePath: string;
    }>;
    deleteSample(code: string, filename: string): Promise<void>;
}
