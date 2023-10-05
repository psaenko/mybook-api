import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MSchema } from 'mongoose';
import { Category } from '../category/category.schema';

export type SubCategoryDocument = HydratedDocument<SubCategory>

@Schema({ timestamps: true })
export class SubCategory {
	@Prop({ required: true, unique: true })
	name: string;

	@Prop({ default: true })
	isShow: boolean;

	@Prop({ required: true, type: MSchema.Types.ObjectId, ref: 'Category' })
	mainCategory: Category;
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);
