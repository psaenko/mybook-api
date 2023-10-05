import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CityDocument = HydratedDocument<City>

@Schema({ timestamps: true })
export class City {
	@Prop({ required: true, unique: true })
	name: string;

	@Prop({ default: true })
	isShow: boolean;
}

export const CitySchema = SchemaFactory.createForClass(City);
