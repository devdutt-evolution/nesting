import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from 'src/schema/booking.schema';
import { CreateBookingDto } from './dto';
import { Flight } from 'src/schema/flight.schema';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private readonly BookingModel: Model<Booking>,
    @InjectModel(Flight.name) private readonly FlightModel: Model<Flight>,
  ) {}

  async bookFlight(createBookingDto: CreateBookingDto) {
    const userId = '65d7386474405a302a3e43bb';
    const flightPrice = await this.checkFlightExist(createBookingDto.flightId);

    if (flightPrice && typeof flightPrice.price == 'number') {
      const booking = await this.BookingModel.create({
        flightId: createBookingDto.flightId,
        userId,
        totalSeats: createBookingDto.totalSeats,
        bookedForDate: createBookingDto.bookedForDate,
        totalPrice: Number(createBookingDto.totalSeats) * flightPrice.price,
      });
      return booking;
    }

    throw new NotFoundException('No such flight found');
  }

  async getBookings() {
    return this.BookingModel.find({
      userId: '65d7386474405a302a3e43bb',
    }).lean();
  }

  // check if the  flight exists and fetch price
  checkFlightExist(flightId: string): Promise<{ price: string }> {
    if (!flightId) throw new NotFoundException('No such flight found');

    return this.FlightModel.findById(flightId, { price: 1, _id: 0 }).lean();
  }
}
