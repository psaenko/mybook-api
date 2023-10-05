import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>

@Schema({ timestamps: true })
export class Category {
	@Prop({ required: true, unique: true })
	name: string;

	@Prop({ default: true })
	isShow: boolean;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
