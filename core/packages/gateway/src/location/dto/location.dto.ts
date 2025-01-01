import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class LocationResponse {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;
}

@ObjectType()
export class LocationListResponse {
  @Field(() => [LocationResponse])
  locations: LocationResponse[];
}
