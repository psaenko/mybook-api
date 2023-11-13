import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { RoleDto } from './dto/role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from './role.model';

const PAGE_LIMIT = 10;

@Injectable()
export class RoleService {
	private readonly logger = new Logger(RoleService.name);

	constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

	async create(roleDto: RoleDto) {
		const newRole = new this.roleModel(roleDto);
		this.logger.log(`Creating a new role with name: ${roleDto.name}`);
		return newRole.save();
	}

	async findAll(page: number = 1, limit: number = PAGE_LIMIT) {
		this.logger.log('Finding all roles');
		const skip = (page - 1) * limit;
		const [total, data] = await Promise.all([
			this.roleModel.countDocuments(),
			this.roleModel.find().skip(skip).limit(limit).exec()
		]);
		return {
			data,
			total,
			totalPages: Math.ceil(total / limit),
		};
	}


	async findOne(id: string) {
		this.logger.log(`Finding role by id: ${id}`);
		const role = await this.roleModel.findById(id).exec();
		if (!role) {
			this.logger.error(`Role with id ${id} not found`);
			throw new NotFoundException(`Role with id ${id} not found`);
		}
		return role;
	}

	async update(id: string, role: Object) {
		this.logger.log(`Updating role with id: ${id}`);
		const updatedRole = await this.roleModel.findByIdAndUpdate(id, role, { new: true }).exec();
		if (!updatedRole) {
			this.logger.error(`Role with id ${id} not found`);
			throw new NotFoundException(`Role with id ${id} not found`);
		}
		return updatedRole;
	}

	async delete(id: string) {
		this.logger.log(`Deleting role with id: ${id}`);
		const deletedRole = await this.roleModel.findByIdAndRemove(id).exec();
		if (!deletedRole) {
			this.logger.error(`Role with id ${id} not found`);
			throw new NotFoundException(`Role with id ${id} not found`);
		}
		return deletedRole;
	}
}
