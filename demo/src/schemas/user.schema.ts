import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongoSchema } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  email: string;

  @Prop()
  hash: string;

  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;

  @Prop()
  createdAt: MongoSchema.Types.Date;

  @Prop()
  updatedAt: MongoSchema.Types.Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
