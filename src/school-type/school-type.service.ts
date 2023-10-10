import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { SchoolTypeDto } from './dto/school-type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SchoolType, SchoolTypeDocument } from './school-type.schema';

const PAGE_LIMIT = 10;

@Injectable()
export class SchoolTypeService {
	private readonly logger = new Logger(SchoolTypeService.name);

	constructor(@InjectModel(SchoolType.name) private schoolType: Model<SchoolTypeDocument>) {}

	async create(schoolTypeDto: SchoolTypeDto) {
		const newSchoolType = new this.schoolType(schoolTypeDto);
		this.logger.log(`Creating a new school-type with name: ${schoolTypeDto.name}`);
		return newSchoolType.save();
	}

	async findAll(page: number = 1, limit: number = PAGE_LIMIT) {
		this.logger.log('Finding all school-types');
		const skip = (page - 1) * limit;
		const [total, data] = await Promise.all([
			this.schoolType.countDocuments(),
			this.schoolType.find().skip(skip).limit(limit).exec()
		]);
		return {
			data,
			total,
			totalPages: Math.ceil(total / limit),
		};
	}


	async findById(id: string) {
		this.logger.log(`Finding school-type by id: ${id}`);
		const role = await this.schoolType.findById(id).exec();
		if (!role) {
			this.logger.error(`school-type with id ${id} not found`);
			throw new NotFoundException(`school-type with id ${id} not found`);
		}
		return role;
	}

	async findOne(name: string) {
		this.logger.log(`Finding school-type by name: ${name}`);
		const role = await this.schoolType.findOne({ name }).exec();
		if (role) {
			this.logger.error(`school-type with name ${name} already exist`);
			throw new NotFoundException(`school-type with name ${name} already exist`);
		}
		return role;
	}

	async update(id: string, role: Object) {
		this.logger.log(`Updating school-type with id: ${id}`);
		const updatedRole = await this.schoolType.findByIdAndUpdate(id, role, { new: true }).exec();
		if (!updatedRole) {
			this.logger.error(`school-type with id ${id} not found`);
			throw new NotFoundException(`School-type with id ${id} not found`);
		}
		return updatedRole;
	}

	async delete(id: string) {
		this.logger.log(`Deleting school-type with id: ${id}`);
		const deletedRole = await this.schoolType.findByIdAndRemove(id).exec();
		if (!deletedRole) {
			this.logger.error(`School-type with id ${id} not found`);
			throw new NotFoundException(`School-type with id ${id} not found`);
		}
		return deletedRole;
	}
}
