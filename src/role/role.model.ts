import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type RoleDocument = HydratedDocument<Role>

@Schema({ timestamps: true })
export class Role {

	@ApiProperty({required: true, example: 'ADMIN'})
	@Prop({ required: true })
	name: string;

	@ApiProperty({required: true, example: 'Адмінісратор'})
	@Prop({ required: true })
	description: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
