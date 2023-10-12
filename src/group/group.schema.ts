import { HydratedDocument, Schema as MSchema, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type GroupDocument = HydratedDocument<Group>

@Schema({ timestamps: true })
export class Group {
	@Prop({ required: true })
	name: string;

	@Prop({ required: false })
	icon: string;

	@Prop({ required: false, default: true })
	isShow: boolean;

	@Prop({ type: [{ type: MSchema.ObjectId, ref: 'Category' }] })
	categories: Types.ObjectId[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
