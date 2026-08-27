import { Document, Types } from 'mongoose';
export type AlertDocument = Alert & Document;
export declare class Alert {
    type: string;
    severity: string;
    location: string;
    defectType: Types.ObjectId;
    message: string;
    isRead: boolean;
}
export declare const AlertSchema: import("mongoose").Schema<Alert, import("mongoose").Model<Alert, any, any, any, any, any, Alert>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Alert, Document<unknown, {}, Alert, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Alert & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    type?: import("mongoose").SchemaDefinitionProperty<string, Alert, Document<unknown, {}, Alert, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Alert & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    severity?: import("mongoose").SchemaDefinitionProperty<string, Alert, Document<unknown, {}, Alert, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Alert & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    location?: import("mongoose").SchemaDefinitionProperty<string, Alert, Document<unknown, {}, Alert, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Alert & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    defectType?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Alert, Document<unknown, {}, Alert, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Alert & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    message?: import("mongoose").SchemaDefinitionProperty<string, Alert, Document<unknown, {}, Alert, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Alert & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isRead?: import("mongoose").SchemaDefinitionProperty<boolean, Alert, Document<unknown, {}, Alert, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Alert & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Alert>;
