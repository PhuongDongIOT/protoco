import { Injectable } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import type { LocationRequest, EmptyRequest, LocationResponse, LocationListResponse } from './location.interface';

@Injectable()
export class LocationService {
  private locations = [
    { id: '1', name: 'Location 1', latitude: 10.123, longitude: 20.123 },
    { id: '2', name: 'Location 2', latitude: 11.234, longitude: 21.234 },
    // Add more mock locations if needed
  ];

  @GrpcMethod('LocationService', 'GetLocation')
  getLocation(data: LocationRequest): LocationResponse {
    const location = this.locations.find((loc) => loc.id === data.id);
    if (!location) {
      throw new Error('Location not found');
    }
    return {
      id: location.id,
      name: location.name,
      latitude: location.latitude,
      longitude: location.longitude,
    };
  }

  @GrpcMethod('LocationService', 'ListLocations')
  listLocations(data: EmptyRequest): LocationListResponse {
    return { locations: this.locations };
  }
}
