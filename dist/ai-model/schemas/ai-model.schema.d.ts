import { Document, Types } from 'mongoose';
export type AiModelDocument = AiModel & Document;
export declare class AiModel {
    version: string;
    status: string;
    accuracy: number;
    trainedOn: number;
    defectTypes: Types.ObjectId[];
    trainStartedAt: Date;
    trainCompletedAt: Date;
    activatedAt: Date;
    reason: string;
    retryCount: number;
}
export declare const AiModelSchema: import("mongoose").Schema<AiModel, import("mongoose").Model<AiModel, any, any, any, any, any, AiModel>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AiModel, Document<unknown, {}, AiModel, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<AiModel & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    version?: import("mongoose").SchemaDefinitionProperty<string, AiModel, Document<unknown, {}, AiModel, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AiModel & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, AiModel, Document<unknown, {}, AiModel, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AiModel & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    accuracy?: import("mongoose").SchemaDefinitionProperty<number, AiModel, Document<unknown, {}, AiModel, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AiModel & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    trainedOn?: import("mongoose").SchemaDefinitionProperty<number, AiModel, Document<unknown, {}, AiModel, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AiModel & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    defectTypes?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId[], AiModel, Document<unknown, {}, AiModel, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AiModel & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    trainStartedAt?: import("mongoose").SchemaDefinitionProperty<Date, AiModel, Document<unknown, {}, AiModel, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AiModel & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    trainCompletedAt?: import("mongoose").SchemaDefinitionProperty<Date, AiModel, Document<unknown, {}, AiModel, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AiModel & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    activatedAt?: import("mongoose").SchemaDefinitionProperty<Date, AiModel, Document<unknown, {}, AiModel, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AiModel & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    reason?: import("mongoose").SchemaDefinitionProperty<string, AiModel, Document<unknown, {}, AiModel, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AiModel & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    retryCount?: import("mongoose").SchemaDefinitionProperty<number, AiModel, Document<unknown, {}, AiModel, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AiModel & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, AiModel>;
