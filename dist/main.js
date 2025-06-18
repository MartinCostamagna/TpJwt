"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const permissions_guard_1 = require("./middlewares/guard/permissions.guard");
const core_2 = require("@nestjs/core");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const reflector = app.get(core_2.Reflector);
    app.useGlobalGuards(new permissions_guard_1.PermissionsGuard(reflector));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map