import { Injectable, OnModuleInit } from '@nestjs/common';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const PROTO_PATH = __dirname +  '../../../location.proto';

@Injectable()
export class LocationService implements OnModuleInit {
  private client: any;

  onModuleInit() {
    const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });
    const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;
    this.client = new protoDescriptor.location.LocationService(
      'localhost:5000',
      grpc.credentials.createInsecure(),
    );
  }

  getLocation(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.GetLocation({ id }, (err, response) => {
        if (err) {
          return reject(err);
        }
        resolve(response);
      });
    });
  }

  listLocations(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.ListLocations({}, (err, response) => {
        if (err) {
          return reject(err);
        }
        resolve(response.locations);
      });
    });
  }
}
