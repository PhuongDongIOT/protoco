import { Module } from '@nestjs/common';
import { LocationModule } from './location/location.module'; // Location module

@Module({
  imports: [
    LocationModule, // Add LocationModule to AppModule
  ],
})
export class AppModule {}