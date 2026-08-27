import { Document, Types } from 'mongoose';
export type DefectTypeDocument = DefectType & Document;
export declare class DefectType {
    code: string;
    name: string;
    description: string;
    severity: string;
    sampleCount: number;
    lastTrainedSampleCount: number;
    sampleImages: any[];
    isActive: boolean;
}
export declare const DefectTypeSchema: import("mongoose").Schema<DefectType, import("mongoose").Model<DefectType, any, any, any, any, any, DefectType>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DefectType, Document<unknown, {}, DefectType, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<DefectType & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    code?: import("mongoose").SchemaDefinitionProperty<string, DefectType, Document<unknown, {}, DefectType, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DefectType & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    name?: import("mongoose").SchemaDefinitionProperty<string, DefectType, Document<unknown, {}, DefectType, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DefectType & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, DefectType, Document<unknown, {}, DefectType, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DefectType & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    severity?: import("mongoose").SchemaDefinitionProperty<string, DefectType, Document<unknown, {}, DefectType, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DefectType & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    sampleCount?: import("mongoose").SchemaDefinitionProperty<number, DefectType, Document<unknown, {}, DefectType, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DefectType & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    lastTrainedSampleCount?: import("mongoose").SchemaDefinitionProperty<number, DefectType, Document<unknown, {}, DefectType, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DefectType & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    sampleImages?: import("mongoose").SchemaDefinitionProperty<any[], DefectType, Document<unknown, {}, DefectType, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DefectType & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isActive?: import("mongoose").SchemaDefinitionProperty<boolean, DefectType, Document<unknown, {}, DefectType, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DefectType & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, DefectType>;
