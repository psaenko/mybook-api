import { Injectable, NotFoundException, Logger, Get, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group, GroupDocument } from './group.schema';
import { GroupDto } from './dto/group.dto';
import { SubCategory, SubCategoryDocument } from '../sub-category/sub-category.schema';
import { PublicationService } from '../publication/publication.service';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ApiRoles } from '../decorators/api-roles.decorator';
import { CityDocument } from '../city/city.schema';
import any = jasmine.any;

const PAGE_LIMIT = 10;

@Injectable()
export class GroupService {
	private readonly logger = new Logger(PublicationService.name);

	constructor(
		@InjectModel(Group.name) private groupModel: Model<GroupDocument>,
		@InjectModel(SubCategory.name) private subCategoryModel: Model<SubCategoryDocument>,
	) {
	}

	private getSkip(page: number): number {
		return (page - 1) * PAGE_LIMIT;
	}

	async findAll(isShow?: boolean, page: number = 1) {
		const skip = this.getSkip(page);
		const query = isShow !== undefined ? { isShow } : {};
		const [total, data] = await Promise.all([
			this.groupModel.countDocuments(query),
			this.groupModel.find(query).skip(skip).limit(PAGE_LIMIT)
				.populate('categories', 'name')
		]);
		this.logger.log(`Finding all groups with isShow: ${isShow} and page: ${page}`);
		return {
			data,
			total,
			totalPages: Math.ceil(total / PAGE_LIMIT),
		};
	}

	async findAllList(isShow?: boolean): Promise<CityDocument[]> {
		const query = isShow !== undefined ? { isShow } : {};
		this.logger.log(`Finding all group list with isShow: ${isShow}`);
		return this.groupModel.find(query).exec();
	}

	async findCategoriesByGroup(id: string, isShow?: boolean): Promise<CityDocument[]> {
		const query: any = { _id: id};
		if (isShow !== undefined) {
			query.isShow = isShow;
		} else {
			query.isShow = {};
		}
		this.logger.log(`Finding all group list with isShow: ${isShow}`);
		return this.groupModel.findOne(query).populate('categories', 'name');
	}

	async findById(id: string) {
		this.logger.log(`Finding group by id: ${id}`);
		const publication = await this.groupModel.findById(id).populate('category', 'name');
		if (!publication) {
			this.logger.error(`Group with id ${id} not found`);
			throw new NotFoundException(`Group with id ${id} not found`);
		}
		return publication;
	}

	async create(groupDto: GroupDto) {
		console.log(groupDto)
		const newGroup = new this.groupModel(groupDto);
		const saved = await newGroup.save();
		this.logger.log(`Created publication with id: ${saved._id}`);
		return saved;
	}

	async update(id: string, group: object) {
		this.logger.log(`Updating group with id: ${id}`);
		const updatedPublication = await this.groupModel.findByIdAndUpdate(id, group, { new: true });
		if (!updatedPublication) {
			this.logger.error(`Group with id ${id} not found`);
			throw new NotFoundException(`Group with id ${id} not found`);
		}
		return updatedPublication;
	}

	async remove(id: string) {
		this.logger.log(`Deleting group with id: ${id}`);
		const deletedPublication = await this.groupModel.findByIdAndRemove(id);
		if (!deletedPublication) {
			this.logger.error(`Group with id ${id} not found`);
			throw new NotFoundException(`Group with id ${id} not found`);
		}
		return deletedPublication;
	}
}
