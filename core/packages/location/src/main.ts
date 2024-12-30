/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // gRPC options configuration
  const grpcOptions: MicroserviceOptions = {
    transport: Transport.GRPC,
    options: {
      package: 'location', // Package name from the .proto file
      protoPath: join(__dirname, '/../../../proto/location.proto'), // Path to the .proto file
    },
  };

  // Start the microservice with the gRPC transport
  app.connectMicroservice(grpcOptions);

  await app.startAllMicroservices();
  await app.listen(4000);
}
bootstrap();