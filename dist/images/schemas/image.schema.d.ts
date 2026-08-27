import { Document, Types } from 'mongoose';
export type ImageDocument = Image & Document;
export declare class Image {
    filePath: string;
    source: string;
    productId: string;
    location: string;
    uploadedBy: Types.ObjectId;
    status: string;
    predictedLabel: Types.ObjectId;
    confidence: number;
    isUnknown: boolean;
    reviewedLabel: Types.ObjectId;
    reviewedBy: Types.ObjectId;
    reviewedAt: Date;
    note: string;
}
export declare const ImageSchema: import("mongoose").Schema<Image, import("mongoose").Model<Image, any, any, any, any, any, Image>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Image, Document<unknown, {}, Image, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Image & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    filePath?: import("mongoose").SchemaDefinitionProperty<string, Image, Document<unknown, {}, Image, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Image & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    source?: import("mongoose").SchemaDefinitionProperty<string, Image, Document<unknown, {}, Image, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Image & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    productId?: import("mongoose").SchemaDefinitionProperty<string, Image, Document<unknown, {}, Image, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Image & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    location?: import("mongoose").SchemaDefinitionProperty<string, Image, Document<unknown, {}, Image, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Image & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    uploadedBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Image, Document<unknown, {}, Image, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Image & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<string, Image, Document<unknown, {}, Image, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Image & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    predictedLabel?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Image, Document<unknown, {}, Image, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Image & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    confidence?: import("mongoose").SchemaDefinitionProperty<number, Image, Document<unknown, {}, Image, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Image & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isUnknown?: import("mongoose").SchemaDefinitionProperty<boolean, Image, Document<unknown, {}, Image, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Image & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    reviewedLabel?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Image, Document<unknown, {}, Image, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Image & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    reviewedBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Image, Document<unknown, {}, Image, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Image & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    reviewedAt?: import("mongoose").SchemaDefinitionProperty<Date, Image, Document<unknown, {}, Image, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Image & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    note?: import("mongoose").SchemaDefinitionProperty<string, Image, Document<unknown, {}, Image, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Image & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Image>;
