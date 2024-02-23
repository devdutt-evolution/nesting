import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Airport } from './airport.schema';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type FlightDocument = HydratedDocument<Flight>;

enum DaysOfWeek {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday',
}

export type WeekDaysFlights = Record<DaysOfWeek, boolean>;

@Schema({ _id: true, versionKey: false, timestamps: true })
export class Flight {
  @Prop({ required: [true, 'Flight code is required'], unique: true })
  flightCode: string;

  // referencing to flight collection
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Airport' })
  from: Airport;

  // referencing to flight collection
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Airport' })
  to: Airport;

  @Prop()
  price: number;

  @Prop()
  departureTime: string;

  @Prop()
  timeZone: string;

  @Prop()
  estimatedDuration: number; // in minutes

  @Prop(
    raw({
      monday: { type: Boolean },
      tuesday: { type: Boolean },
      wednesday: { type: Boolean },
      thursday: { type: Boolean },
      friday: { type: Boolean },
      sunday: { type: Boolean },
      saturday: { type: Boolean },
    }),
  )
  onDays: Record<DaysOfWeek, boolean>;
}

export const FlightSchema = SchemaFactory.createForClass(Flight);
FlightSchema.index({ from: 1, to: 1 });
