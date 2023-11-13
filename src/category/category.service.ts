import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './category.model';
import { CreateDto, UpdateDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);
  constructor(@InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>) {}

  async findAll(isShow?: boolean) {
    const query = isShow !== undefined ? { isShow } : {};
    return this.categoryModel.find(query);
  }

  async findByName(name: string) {
    return this.categoryModel.findOne({ name });
  }

  async create(createDto: CreateDto) {
    const newCategory = new this.categoryModel(createDto);
    const savedCategory = await newCategory.save();
    this.logger.log(`Created category with id: ${savedCategory.id}`);
    return savedCategory;
  }

  async findById(id: string) {
    const category = await this.categoryModel.findById(id);
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  async update(id: string, updateDto: any) {
    const updatedCategory = await this.categoryModel.findByIdAndUpdate(id, updateDto, { new: true });
    if (!updatedCategory) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return updatedCategory;
  }

  async delete(id: string) {
    const deletedCategory = await this.categoryModel.findByIdAndRemove(id);
    if (!deletedCategory) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return deletedCategory;
  }
}
