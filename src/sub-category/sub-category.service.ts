import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubCategory, SubCategoryDocument } from './sub-category.model';
import {CreateSubCategoryDto} from './dto/create.sub-category.dto'

@Injectable()
export class SubCategoryService {
	constructor(@InjectModel(SubCategory.name) private readonly subCategoryModel: Model<SubCategoryDocument>) {
	}

	async findAll(isShow?: boolean) {
		const query = isShow !== undefined ? { isShow } : {};
		return this.subCategoryModel.find(query).populate('mainCategory', 'name');
	}

	async findByName(name: string) {
		return this.subCategoryModel.findOne({ name });
	}

	async create(createSubCategoryDto: CreateSubCategoryDto) {
		const newSubCategory = new this.subCategoryModel(createSubCategoryDto);
		return newSubCategory.save();
	}

	async findById(id: string) {
		return this.subCategoryModel.findById(id);
	}

	async update(id: string, isCheck: boolean) {
		return this.subCategoryModel.findByIdAndUpdate(id, { isShow: isCheck }, { new: true });
	}

	async delete(id: string) {
		return this.subCategoryModel.findByIdAndRemove(id);
	}
}
