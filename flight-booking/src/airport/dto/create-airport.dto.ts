import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAirportDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'airport name is required' })
  airportName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'airport code is required' })
  airportCode: string;
}
