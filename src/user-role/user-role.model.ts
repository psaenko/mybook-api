import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MSchema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../role/role.model';
import { User } from '../user/user.model';

export type UserRoleDocument = HydratedDocument<UserRole>

@Schema({ timestamps: true })
export class UserRole {

	@ApiProperty({ required: true, example: '65134c895b653bdbc1fb5c90' })
	@Prop({ required: true, type: MSchema.Types.ObjectId, ref: 'User' })
	userId: User;

	@ApiProperty({ required: true, example: '65134c895b003bdbc1fb5c87' })
	@Prop({ required: true, type: MSchema.Types.ObjectId, ref: 'Role' })
	roleId: Role;
}

export const UserRoleSchema = SchemaFactory.createForClass(UserRole);
