import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

// capped collection length 1
@Schema({
  _id: true,
  capped: { size: 300 },
  timestamps: true,
  versionKey: false,
})
export class User {
  @Prop()
  name: string;

  @Prop({ required: [true, 'User email is required'] })
  email: string;

  // password encrypted
  @Prop({ required: [true, 'User password is required'] })
  hash: string;
}

// function creates schema from Provided class and its type
export const UserSchema = SchemaFactory.createForClass(User);
