export declare class CreateDefectTypeDto {
    code: string;
    name: string;
    description?: string;
    severity?: string;
}
export declare class UpdateDefectTypeDto {
    name?: string;
    description?: string;
    severity?: string;
    isActive?: boolean;
}
