import { HydratedDocument, Schema as MSchema, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SubCategory } from '../sub-category/sub-category.schema';

export type PublicationDocument = HydratedDocument<Publication>

@Schema({ timestamps: true })
export class Publication {
	@Prop({required: true})
	title: string;

	@Prop({ type: [{ type: MSchema.ObjectId, ref: 'Author' }] })
	authors: Types.ObjectId[];

	@Prop({required: true})
	year: number;

	@Prop()
	description: string;

	@Prop({ required: true, type: MSchema.Types.ObjectId, ref: 'SubCategory' })
	category: SubCategory;

	@Prop({required: false, default: false})
	isShow: string;

	@Prop({required: true})
	mainImage: string;

	@Prop({required: true})
	mainFile: string;

	@Prop({ type: [String], default: [] })
	files: string[];
}

export const PublicationSchema = SchemaFactory.createForClass(Publication);
