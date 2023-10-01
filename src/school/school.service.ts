import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { SchoolDocument, School } from './school.model';
import { UpdateSchoolDto } from './dto/update.dto';
import { CreateSchoolDto } from './dto/create.dto';

@Injectable()
export class SchoolService {
	constructor(@InjectModel(School.name) private schoolModel: Model<SchoolDocument>) {
	}

	async getAllSchools() {
		return this.schoolModel.find();
	}

	async getSchoolsById(id: string) {
		return await this.schoolModel.findById(id);
	}

	async getSchoolsByCity(city: string, type?: string) {
		return await this.schoolModel.find({ city, type });
	}

	async createSchool(CreateSchoolDto: CreateSchoolDto) {
		const newSchool = await new this.schoolModel(CreateSchoolDto);
		return newSchool.save();
	}

	async updateSchool(id: string, UpdateSchoolDto: UpdateSchoolDto) {
		return await this.schoolModel.findByIdAndUpdate(id, UpdateSchoolDto);
	}

	async deleteSchool(id: string) {
		return await this.schoolModel.findByIdAndDelete(id);
	}
}
