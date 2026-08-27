import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/schemas/user.schema';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<UserDocument | null>;
    login(user: UserDocument): Promise<{
        access_token: string;
        user: {
            _id: any;
            username: string;
            role: import("../common/decorators/roles.decorator").Role;
        };
    }>;
}
