import { HydratedDocument, Schema as MSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { City } from '../city/city.schema';
import { Role } from '../role/role.schema';
import { School } from '../school/school.schema';

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User {
	@Prop({ required: true })
	fullName: string;

	@Prop({ unique: true })
	login: string;

	@Prop()
	email: string;

	@Prop({ required: true })
	passwordHash: string;

	@Prop({ required: false, default: true })
	status: boolean;

	@Prop({ type: MSchema.Types.ObjectId, ref: 'City' })
	city: City;

	@Prop({ type: MSchema.Types.ObjectId, ref: 'School' })
	school: School;

	// @Prop({ type: MSchema.Types.ObjectId, ref: 'Class' })
	// class: Class;

	// @Prop({type: MSchema.Types.ObjectId, ref: 'ExtracurricularInstitution'})
	// extracurricularInstitution: ExtracurricularInstitution;

	@Prop()
	avatar: string;

	@Prop({ type: MSchema.Types.ObjectId, ref: 'Role', default: '6519a12cc60f1fcd95aa9aa2' })
	role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);