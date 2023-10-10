import { HydratedDocument, Schema as MSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { City } from '../city/city.schema';
import { ApiProperty } from '@nestjs/swagger';
import { SchoolType } from '../school-type/school-type.schema';

export type SchoolDocument = HydratedDocument<School>

@Schema({ timestamps: true })
export class School {
	@ApiProperty({required: true, example: 'КЗО "СЗШ №999" ДМР'})
	@Prop({ required: true })
	name: string;

	@ApiProperty({required: true, example: '6512f25c770624afefed1293'})
	@Prop({ required: true, type: MSchema.Types.ObjectId, ref: 'SchoolType' })
	type: SchoolType;

	@ApiProperty({required: true, example: '6512f25c770624afefed1293'})
	@Prop({ type: MSchema.Types.ObjectId, ref: 'City' })
	city: City;
}

export const SchoolSchema = SchemaFactory.createForClass(School);
