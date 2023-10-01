import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from './role.model';

@Injectable()
export class RoleService {
	constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {
	}

	create(createRoleDto: CreateRoleDto) {
		return 'This action adds a new role';
	}

	findAll() {
		return `This action returns all role`;
	}

	findOne(id: number) {
		return `This action returns a #${id} role`;
	}

	update(id: number, updateRoleDto: UpdateRoleDto) {
		return `This action updates a #${id} role`;
	}

	remove(id: number) {
		return `This action removes a #${id} role`;
	}
}
