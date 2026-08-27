import type { Role } from '../../common/decorators/roles.decorator';
export declare class CreateUserDto {
    username: string;
    password?: string;
    role?: Role;
    expiresAt?: Date | string | null;
}
