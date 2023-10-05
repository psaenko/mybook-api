import { HydratedDocument, Schema as MSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { City } from '../city/city.schema';

export type SchoolDocument = HydratedDocument<School>

@Schema({ timestamps: true })
export class School {

	@Prop({ required: true })
	name: string;

	@Prop({ required: true })
	type: string;

	@Prop({ type: MSchema.Types.ObjectId, ref: 'City' })
	city: City;
}

export const SchoolSchema = SchemaFactory.createForClass(School);
