import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Flight } from 'src/schema/flight.schema';
import { CreateFlightDto } from './dto';

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(Flight.name) private readonly FlightModel: Model<Flight>,
  ) {}

  async createFlight(flightDto: CreateFlightDto) {
    const flightCount = await this.FlightModel.countDocuments({
      flightCode: flightDto.flightCode,
    });

    if (flightCount > 0)
      throw new ConflictException('Flightcode should be unique');

    const flight = await this.FlightModel.create(flightDto);
    return flight;
  }

  getFlights(
    from: string = '',
    to: string = '',
    departureDate: string = '',
  ): Promise<(Flight & { _id: any })[]> {
    const searchObject = {};

    if (from.length > 0) Object.assign(searchObject, { from });
    if (to.length > 0) Object.assign(searchObject, { to });

    if (departureDate.length > 0) {
      try {
        const date = new Date(departureDate);
        switch (date.getDay()) {
          case 1:
            Object.assign(searchObject, { 'onDays.monday': true });
            break;
          case 2:
            Object.assign(searchObject, { 'onDays.tuesday': true });
            break;
          case 3:
            Object.assign(searchObject, { 'onDays.wednesday': true });
            break;
          case 4:
            Object.assign(searchObject, { 'onDays.thursday': true });
            break;
          case 5:
            Object.assign(searchObject, { 'onDays.friday': true });
            break;
          case 6:
            Object.assign(searchObject, { 'onDays.saturday': true });
            break;
          case 7:
            Object.assign(searchObject, { 'onDays.sunday': true });
            break;
        }
      } catch (err) {
        throw new BadRequestException('Provide a valid date');
      }
    }

    const flight = this.FlightModel.find(searchObject, {
      createdAt: 0,
      updatedAt: 0,
    }).lean();

    return flight;
  }
}
