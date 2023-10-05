import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SchoolDocument, School } from './school.schema';
import { UpdateSchoolDto } from './dto/update.dto';
import { CreateSchoolDto } from './dto/create.dto';
import {NOT_FOUND_ERROR, ALREADY_EXIST_ERROR} from './school.constants'

@Injectable()
export class SchoolService {
	constructor(@InjectModel(School.name) private schoolModel: Model<SchoolDocument>) {
	}

	async findAll() {
		return this.schoolModel.find();
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

