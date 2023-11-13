import { HydratedDocument, Schema as MSchema, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { City } from '../city/city.model';
import { Role } from '../role/role.model';
import { School } from '../school/school.model';
import { Publication } from '../publication/publication.model';

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

	@Prop({ default: null })
	class: number;

	@Prop()
	avatar: string;

	@Prop({ type: Boolean, default: false })
	withGoogle: boolean;

	@Prop({ type: Date })
	birthdayDate: Date;

	@Prop({ type: MSchema.Types.ObjectId, ref: 'Role', default: '6519a12cc60f1fcd95aa9aa2' })
	role: Role;

	@Prop({ type: [{ type: MSchema.Types.ObjectId, ref: 'Publication' }] })
	saved: Types.ObjectId[];
}

export const UserModel = SchemaFactory.createForClass(User);
