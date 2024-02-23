import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Airport } from 'src/schema/airport.schema';
import { CreateAirportDto } from './dto';

@Injectable()
export class AirportService {
  constructor(
    @InjectModel(Airport.name) private readonly AirportModel: Model<Airport>,
  ) {}

  async createAirport(airportDto: CreateAirportDto) {
    const countCode = await this.AirportModel.countDocuments({
      airportCode: airportDto.airportCode,
    });

    if (countCode > 0) throw new ConflictException();

    const airport = await this.AirportModel.create(airportDto);
    return airport;
  }

  async getAirports(
    searchQuery: string = '',
  ): Promise<(Airport & { _id: any })[]> {
    const searchObj = {};
    if (searchQuery.length > 0)
      Object.assign(searchObj, { $text: { $search: searchQuery } });

    const airports = await this.AirportModel.find(searchObj, {
      airportCode: 1,
      airportName: 1,
    }).lean();

    return airports;
  }
}
