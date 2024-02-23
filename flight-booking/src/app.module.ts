import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AirportModule } from './airport/airport.module';
import { FlightModule } from './flight/flight.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    // import mongoose and connecting to db
    MongooseModule.forRootAsync({
      // config module to get env variable
      imports: [ConfigModule],
      // factory will use the variable provided by us and it has access to injected class
      useFactory(config: ConfigService) {
        return { uri: config.get('DATABASE_URL') };
      },
      // config service inject
      inject: [ConfigService],
    }),
    // config module is import globally
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    AirportModule,
    FlightModule,
    BookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
