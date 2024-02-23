import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateBookingDto } from './dto';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@ApiBearerAuth()
@ApiTags('booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiBadRequestResponse()
  @ApiCreatedResponse()
  @Post()
  async bookFlight(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.bookFlight(createBookingDto);
  }

  @ApiOkResponse()
  @Get()
  async getBookings() {
    return this.bookingService.getBookings();
  }
}
