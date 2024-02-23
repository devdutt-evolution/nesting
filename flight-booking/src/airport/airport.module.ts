import { Module } from '@nestjs/common';
import { AirportService } from './airport.service';
import { AirportController } from './airport.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Airport, AirportSchema } from 'src/schema/airport.schema';
// import { JwtService } from '@nestjs/jwt';
// import { JwtGuard } from 'src/auth/guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Airport.name, schema: AirportSchema }]),
  ],
  controllers: [AirportController],
  providers: [AirportService],
})
export class AirportModule {}
