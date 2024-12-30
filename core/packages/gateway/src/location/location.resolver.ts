import { Resolver, Query, Args } from '@nestjs/graphql';
import { LocationService } from './location.service';
import { LocationResponse } from './dto/location.dto';

@Resolver(() => LocationResponse)
export class LocationResolver {
  constructor(private readonly locationService: LocationService) {}

  @Query(() => LocationResponse)
  async getLocation(@Args('id') id: string): Promise<LocationResponse> {
    return this.locationService.getLocation(id);
  }

  @Query(() => [LocationResponse])
  async listLocations(): Promise<LocationResponse[]> {
    const response = await this.locationService.listLocations();
    return response.locations;
  }
}
