import { HydratedDocument, Schema as MSchema, Document } from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';

export type PublicationDocument = HydratedDocument<PublicationModel> & Document

@Schema()
export class PublicationModel {
	_id: MSchema.Types.ObjectId;

	@Prop({required: true})
	image: string;

	@Prop({required: true})
	file: string;

	@Prop({required: true})
	title: string;

	@Prop({required: true})
	description: string;

	@Prop({required: true})
	categories: string;


}
