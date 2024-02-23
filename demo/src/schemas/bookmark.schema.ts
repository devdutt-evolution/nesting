import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type BookmarkDocument = HydratedDocument<Bookmark>;

@Schema()
export class Bookmark {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  link: string;

  @Prop(MongooseSchema.Types.Date)
  createdAt: MongooseSchema.Types.Date;

  @Prop(MongooseSchema.Types.Date)
  updatedAt: MongooseSchema.Types.Date;

  @Prop(MongooseSchema.Types.ObjectId)
  _id: MongooseSchema.Types.ObjectId;
}

export const BookmarkSchema = SchemaFactory.createForClass(Bookmark);
