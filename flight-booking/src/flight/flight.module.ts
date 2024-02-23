import { Module } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightController } from './flight.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Flight, FlightSchema } from 'src/schema/flight.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Flight.name, schema: FlightSchema }]),
  ],
  controllers: [FlightController],
  providers: [FlightService],
})
export class FlightModule {}
