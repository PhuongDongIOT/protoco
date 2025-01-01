import { defineConfig } from 'drizzle-kit';
import { ConfigService } from '@nestjs/config';
import 'dotenv/config';
import type { EnvironmentVariables } from './src/common/utils/environment-variables.ts.js';

const configService = new ConfigService<EnvironmentVariables, true>();

export default defineConfig({
  schema: './src/core/database/database-schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    host: configService.get('POSTGRES_HOST'),
    port: configService.get('POSTGRES_PORT'),
    user: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
  },
})