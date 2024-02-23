import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from 'src/schema/booking.schema';
import { Flight, FlightSchema } from 'src/schema/flight.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema },
      { name: Flight.name, schema: FlightSchema },
    ]),
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
