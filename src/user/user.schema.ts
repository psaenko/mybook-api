import { HydratedDocument, Schema as MSchema, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { City } from '../city/city.schema';
import { Role } from '../role/role.schema';
import { School } from '../school/school.schema';
import { Publication } from '../publication/publication.schema';

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User {
	@Prop({ required: true })
	fullName: string;

	@Prop({ unique: true, required: false })
	login: string;

	@Prop({ required: false, default: null })
	passwordHash: string;

	@Prop({ default: 'active' })
	status: string;

	@Prop()
	email: string;

	@Prop({ type: MSchema.Types.ObjectId, ref: 'City' })
	city: City;

	@Prop({ type: MSchema.Types.ObjectId, ref: 'School' })
	school: School;

	@Prop()
	avatar: string;

	@Prop({ type: Boolean, default: false })
	withGoogle: boolean;

	@Prop({ type: MSchema.Types.ObjectId, ref: 'Role', default: '6519a12cc60f1fcd95aa9aa2' })
	role: Role;

	@Prop({ type: [{ type: MSchema.Types.ObjectId, ref: 'Publication' }] })
	saved: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
