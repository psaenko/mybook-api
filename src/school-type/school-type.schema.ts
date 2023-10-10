import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type SchoolTypeDocument = HydratedDocument<SchoolType>

@Schema({ timestamps: true })
export class SchoolType {

	@ApiProperty({required: true, example: 'school'})
	@Prop({ required: true, unique: true })
	name: string;

	@ApiProperty({required: true, example: 'Загальноосвітні заклади освіти'})
	@Prop({ required: true })
	description: string;
}

export const SchoolTypeSchema = SchemaFactory.createForClass(SchoolType);
