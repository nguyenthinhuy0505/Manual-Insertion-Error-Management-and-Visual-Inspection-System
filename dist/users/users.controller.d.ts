import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(dto: CreateUserDto): Promise<any>;
    findAll(): Promise<import("./schemas/user.schema").UserDocument[]>;
    findOne(id: string): Promise<import("./schemas/user.schema").UserDocument>;
    remove(id: string): Promise<void>;
    toggleFreeze(id: string): Promise<import("./schemas/user.schema").UserDocument>;
    extendExpiration(id: string, body: {
        expiresAt: string | null;
    }): Promise<import("./schemas/user.schema").UserDocument>;
}
