import { ReviewService } from './review.service';
declare class ApproveDto {
    defectTypeCode?: string | null;
}
declare class RejectDto {
    note?: string;
}
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    approve(id: string, dto: ApproveDto, req: any): Promise<import("../images/schemas/image.schema").ImageDocument>;
    reject(id: string, dto: RejectDto, req: any): Promise<import("../images/schemas/image.schema").ImageDocument>;
}
export {};
