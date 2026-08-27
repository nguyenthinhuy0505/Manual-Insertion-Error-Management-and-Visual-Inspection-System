"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const users_service_1 = require("./users/users.service");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const usersService = app.get(users_service_1.UsersService);
    try {
        const admin = await usersService.findByUsername('admin');
        if (admin) {
            console.log('Admin account already exists.');
        }
        else {
            await usersService.create({
                username: 'admin',
                password: 'password123',
                role: 'admin',
            });
            console.log('Admin account created: username=admin, password=password123');
        }
    }
    catch (error) {
        console.error('Error seeding admin account:', error);
    }
    finally {
        await app.close();
    }
}
bootstrap();
//# sourceMappingURL=seed.js.map