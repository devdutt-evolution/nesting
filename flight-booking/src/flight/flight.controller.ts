import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FlightService } from './flight.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiProperty,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateFlightDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

class FileUpload {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

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

  @HttpCode(HttpStatus.OK)
  @Post('photo')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: FileUpload })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination(req, file, callback) {
          callback(null, 'pictures');
        },
        filename(req, file, callback) {
          callback(null, `${Date.now()}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { filename: file.filename };
  }
}
