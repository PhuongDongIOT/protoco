import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Location {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  latitude: number;

  @Field()
  longitude: number;
}
