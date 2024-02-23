import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'flightId is required' })
  flightId: string;

  @ApiProperty()
  @IsNotEmpty()
  bookedForDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt({ message: 'totalSeat should be a number' })
  @Min(1, { message: 'seat should be atleast be one' })
  @Min(200, { message: 'totalSeat should be less then 200' })
  totalSeats: number;
}
