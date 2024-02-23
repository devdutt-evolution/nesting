import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { Flight } from './flight.schema';

export type BookingDocument = HydratedDocument<Booking>;

// capped collection length 1
@Schema({ _id: true, timestamps: true, versionKey: false })
export class Booking {
  // ref to User collection
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  // ref to Flight collection
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Flight' })
  flightId: Flight;

  @Prop()
  bookedForDate: string;

  @Prop({ max: [200, 'can only book 200 seat at a time'] })
  totalSeats: number;

  @Prop()
  totalPrice: number;
}

// function creates schema from Provided class and its type
export const BookingSchema = SchemaFactory.createForClass(Booking);
BookingSchema.index({ userId: 1 });
