import { HydratedDocument, Schema as MSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { City } from '../city/city.model';
import { Role } from '../role/role.model';
import { School } from '../school/school.model';

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User {
	@Prop({ required: true })
	fullName: string;

	@Prop({ unique: true })
	login: string;

	@Prop({ unique: true })
	email: string;

	@Prop({ required: true })
	passwordHash: string;

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

	@Prop({ type: MSchema.Types.ObjectId, ref: 'Role' })
	role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
