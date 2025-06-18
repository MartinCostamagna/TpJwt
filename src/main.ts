import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PermissionsGuard } from './middlewares/guard/permissions.guard';
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new PermissionsGuard(reflector));
  await app.listen(3000);
}
bootstrap();
