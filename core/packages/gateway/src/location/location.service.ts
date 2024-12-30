import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, Transport } from '@nestjs/microservices';
import type { ClientGrpc } from '@nestjs/microservices';
import { join } from 'path';
import { LocationResponse, LocationListResponse } from './location.interface';

@Injectable()
export class LocationService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'location',  // The package defined in the proto file
      protoPath: join(__dirname, '/../../../proto/location.proto'),  // Path to the .proto file
    },
  })
  private client: ClientGrpc;

  private locationService;

  onModuleInit() {
    this.locationService = this.client.getService('LocationService');
  }

  // Call GetLocation RPC
  getLocation(id: string): Promise<LocationResponse> {
    return this.locationService.getLocation({ id });
  }

  // Call ListLocations RPC
  listLocations(): Promise<LocationListResponse> {
    return this.locationService.listLocations({});
  }
}
