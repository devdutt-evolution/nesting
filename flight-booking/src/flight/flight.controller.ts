import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { FlightService } from './flight.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateFlightDto } from './dto';
import { JwtGuard } from 'src/auth/guard';

@ApiTags('flight')
@Controller('flight')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiBadRequestResponse()
  @ApiConflictResponse()
  @ApiCreatedResponse()
  @Post()
  async createFlight(@Body() createFlightDto: CreateFlightDto) {
    return await this.flightService.createFlight(createFlightDto);
  }

  @ApiOkResponse()
  @Get()
  @ApiQuery({
    name: 'from',
    required: false,
    description: 'airport id of the airport',
  })
  @ApiQuery({
    name: 'to',
    required: false,
    description: 'airport id of the airport',
  })
  @ApiQuery({
    name: 'date',
    required: false,
    description: 'date to check flight for',
  })
  async getFlights(
    @Query('from') fromAirport: string | undefined,
    @Query('to') toAirport: string | undefined,
    @Query('date') departureDate: string | undefined,
  ) {
    return await this.flightService.getFlights(
      fromAirport,
      toAirport,
      departureDate,
    );
  }
}
