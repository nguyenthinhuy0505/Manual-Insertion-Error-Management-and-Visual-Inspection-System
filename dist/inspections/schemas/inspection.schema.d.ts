import { Document, Types } from 'mongoose';
export type InspectionDocument = Inspection & Document;
export declare class Inspection {
    imageId: Types.ObjectId;
    productId: string;
    location: string;
    defectType: Types.ObjectId;
    isDefective: boolean;
    isUnknown: boolean;
    isIncorrect: boolean;
    modelVersion: string;
    inspectedAt: Date;
}
export declare const InspectionSchema: import("mongoose").Schema<Inspection, import("mongoose").Model<Inspection, any, any, any, any, any, Inspection>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Inspection, Document<unknown, {}, Inspection, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Inspection & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    imageId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Inspection, Document<unknown, {}, Inspection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Inspection & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    productId?: import("mongoose").SchemaDefinitionProperty<string, Inspection, Document<unknown, {}, Inspection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Inspection & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    location?: import("mongoose").SchemaDefinitionProperty<string, Inspection, Document<unknown, {}, Inspection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Inspection & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    defectType?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Inspection, Document<unknown, {}, Inspection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Inspection & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isDefective?: import("mongoose").SchemaDefinitionProperty<boolean, Inspection, Document<unknown, {}, Inspection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Inspection & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isUnknown?: import("mongoose").SchemaDefinitionProperty<boolean, Inspection, Document<unknown, {}, Inspection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Inspection & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isIncorrect?: import("mongoose").SchemaDefinitionProperty<boolean, Inspection, Document<unknown, {}, Inspection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Inspection & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    modelVersion?: import("mongoose").SchemaDefinitionProperty<string, Inspection, Document<unknown, {}, Inspection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Inspection & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    inspectedAt?: import("mongoose").SchemaDefinitionProperty<Date, Inspection, Document<unknown, {}, Inspection, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Inspection & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Inspection>;
