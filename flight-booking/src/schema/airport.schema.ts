import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AirportDocument = HydratedDocument<Airport>;

@Schema({ versionKey: false, _id: true, timestamps: true })
export class Airport {
  @Prop({ required: [true, 'Airport name is required'] })
  airportName: string;

  @Prop({ required: [true, 'Airport code is required'] })
  airportCode: string;
}

export const AirportSchema = SchemaFactory.createForClass(Airport);
AirportSchema.index({ airportName: 'text', airportCode: 'text' });
