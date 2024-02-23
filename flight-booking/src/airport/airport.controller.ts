import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AirportService } from './airport.service';
import { CreateAirportDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('airport')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('airport')
export class AirportController {
  constructor(private readonly airportService: AirportService) {}

  @ApiBadRequestResponse({
    description: '',
  })
  @ApiConflictResponse()
  @ApiCreatedResponse()
  @Post()
  async createAirport(@Body() createAirportDto: CreateAirportDto) {
    return await this.airportService.createAirport(createAirportDto);
  }

  @ApiOkResponse()
  @ApiQuery({
    name: 'q',
    required: false,
  })
  @Get()
  async getAirports(@Query('q') search: string | undefined) {
    return await this.airportService.getAirports(search);
  }
}
