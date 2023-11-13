import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MSchema } from 'mongoose';
import { Category } from '../category/category.model';
import { ApiProperty } from '@nestjs/swagger';

export type SubCategoryDocument = HydratedDocument<SubCategory>

@Schema({ timestamps: true })
export class SubCategory {

	@ApiProperty({required: true, example: 'Математика'})
	@Prop({ required: true, unique: true })
	name: string;

	@ApiProperty({required: true, example: [true, false]})
	@Prop({ default: true })
	isShow: boolean;

	@ApiProperty({required: true, example: '6512f25c770624afefed1293'})
	@Prop({ required: true, type: MSchema.Types.ObjectId, ref: 'Category' })
	mainCategory: Category;
}

export const SubCategoryModel = SchemaFactory.createForClass(SubCategory);
