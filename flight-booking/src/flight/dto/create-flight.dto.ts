import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Schema } from 'mongoose';
import { Airport } from 'src/schema/airport.schema';
import { WeekDaysFlights } from 'src/schema/flight.schema';

export class CreateFlightDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'flightCode is required' })
  flightCode: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'from is required' })
  from: Schema.Types.ObjectId | Airport;

  @ApiProperty()
  @IsNotEmpty({ message: 'to is required' })
  to: Schema.Types.ObjectId | Airport;

  @ApiProperty()
  @IsNotEmpty({ message: 'price is required' })
  price: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'departureTime is required' })
  departureTime: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'estimatedDuration is required' })
  estimatedDuration: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'timeZone is required' })
  timeZone: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'onDays is required' })
  onDays: WeekDaysFlights;
}
