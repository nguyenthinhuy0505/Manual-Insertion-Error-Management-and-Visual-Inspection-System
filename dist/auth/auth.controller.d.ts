import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    login(req: any): Promise<{
        access_token: string;
        user: {
            _id: any;
            username: string;
            role: import("../common/decorators/roles.decorator").Role;
        };
    }>;
    getProfile(req: any): any;
}
