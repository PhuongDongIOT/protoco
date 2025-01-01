import { Type } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

const envSchema = Type.Object({
  APP_PORT: Type.String(),  
  API_PREFIX:  Type.String(),
  API_VERSION:  Type.String()
});

if (!Value.Check(envSchema, process.env)) throw new Error('Invalid env variables');
export const env = Value.Cast(envSchema, process.env);
