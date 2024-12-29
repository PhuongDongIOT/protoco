import { Resolver, Query, Args } from '@nestjs/graphql';
import { LocationService } from './location.service';
import { Location } from './models/location.model';

@Resolver(() => Location)
export class LocationResolver {
  constructor(private readonly locationService: LocationService) {}

  @Query(() => Location, { name: 'getLocation' }) // Query trả về một Location
  async getLocation(@Args('id') id: string): Promise<Location> {
    return this.locationService.getLocation(id);
  }

  @Query(() => [Location], { name: 'listLocations' }) // Query trả về danh sách Location
  async listLocations(): Promise<Location[]> {
    return this.locationService.listLocations();
  }
}
