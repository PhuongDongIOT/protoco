import * as fs from 'fs';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

import { SettingService } from '@/shared/services/setting.service';
import { ISwaggerConfigInterface } from '@/core/interfaces/swagger.interface';

export function setupSwagger(
  app: NestFastifyApplication,
  config: ISwaggerConfigInterface,
) {
  const configService = new SettingService();
  const options = new DocumentBuilder()
    .setTitle(config.title)
    .setDescription(config.description)
    .setVersion(config.version)
    .addServer('/api')
    .setContact('Sociolite', 'https://sociolite.id', 'hello@sociolite.id')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));

  SwaggerModule.setup(config.path, app, document);
}
