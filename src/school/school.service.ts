import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SchoolDocument, School } from './school.model';
import { UpdateSchoolDto } from './dto/update.dto';
import { CreateSchoolDto } from './dto/create.dto';
import {NOT_FOUND_ERROR, ALREADY_EXIST_ERROR} from './school.constants'

const PAGE_LIMIT = 10;

@Injectable()
export class SchoolService {
	private logger = new Logger('SchoolService');
	constructor(@InjectModel(School.name) private schoolModel: Model<SchoolDocument>) {
	}

	private getSkip(page: number): number {
		return (page - 1) * PAGE_LIMIT;
	}

	async findAll(isShow?: boolean, page: number = 1) {
		const skip = this.getSkip(page);
		const query = isShow !== undefined ? { isShow } : {};
		const [total, data] = await Promise.all([
			this.schoolModel.countDocuments(query),
			this.schoolModel.find(query).skip(skip).limit(PAGE_LIMIT)
				.populate('type', 'name -_id')
				.populate('city', 'name -_id')
		]);
		this.logger.log(`Finding all schools with isShow: ${isShow} and page: ${page}`);
		return {
			data,
			total,
			totalPages: Math.ceil(total / PAGE_LIMIT),
		};
	}

	async findAllList(isShow?: boolean){
		const query = isShow !== undefined ? { isShow } : {};
		this.logger.log(`Finding all cities list with isShow: ${isShow}`);
		return this.schoolModel.find(query).exec();
	}

	async findById(id: string) {
		const school = await this.schoolModel.findById(id);
		if (!school) {
			throw new NotFoundException(NOT_FOUND_ERROR);
		}
		return school;
	}

	async findByCity(city: string, type?: string) {
		return await this.schoolModel.find({ city, type });
	}

	async create(createSchoolDto: CreateSchoolDto) {
		const existingSchool = await this.schoolModel.findOne({ name: createSchoolDto.name });
		if (existingSchool) {
			throw new ConflictException(ALREADY_EXIST_ERROR);
		}
		const newSchool = new this.schoolModel(createSchoolDto);
		return newSchool.save();
	}

	async update(id: string, updateSchoolDto: UpdateSchoolDto) {
		return await this.schoolModel.findByIdAndUpdate(id, updateSchoolDto, { new: true });
	}

	async delete(id: string) {
		return await this.schoolModel.findByIdAndDelete(id);
	}
}

