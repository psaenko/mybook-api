import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CityDocument = HydratedDocument<City>

@Schema({ timestamps: true })
export class City {
	@Prop({ required: true })
	name: string;
}

export const CitySchema = SchemaFactory.createForClass(City);
