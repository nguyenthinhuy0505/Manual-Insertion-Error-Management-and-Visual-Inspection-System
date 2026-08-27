import { Model } from 'mongoose';
import { UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(dto: CreateUserDto): Promise<UserDocument>;
    findAll(): Promise<UserDocument[]>;
    findById(id: string): Promise<UserDocument>;
    findByUsername(username: string): Promise<UserDocument | null>;
    findByApiKey(apiKey: string): Promise<UserDocument | null>;
    remove(id: string): Promise<void>;
    toggleFreeze(id: string): Promise<UserDocument>;
    extendExpiration(id: string, expiresAt: Date | null): Promise<UserDocument>;
}
