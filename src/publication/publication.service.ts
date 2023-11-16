import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Publication, PublicationDocument } from './publication.model';
import { PublicationDto } from './dto/publication.dto';
import { SubCategory, SubCategoryDocument } from '../sub-category/sub-category.model';
import { Group, GroupDocument } from '../group/group.model';
import { Category, CategoryDocument } from '../category/category.model';

const PAGE_LIMIT = 10;

@Injectable()
export class PublicationService {
	private readonly logger = new Logger(PublicationService.name);

	constructor(
		@InjectModel(Publication.name) private publicationModel: Model<PublicationDocument>,
		@InjectModel(SubCategory.name) private subCategoryModel: Model<SubCategoryDocument>,
		@InjectModel(Group.name) private groupModel: Model<GroupDocument>,
		@InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
	) {
	}

	private getSkip(page: number): number {
		return (page - 1) * PAGE_LIMIT;
	}

	async findAll(isShow?: boolean, page: number = 1) {
		const skip = this.getSkip(page);
		const query = isShow !== undefined ? { isShow } : {};
		const [total, data] = await Promise.all([
			this.publicationModel.countDocuments(query),
			this.publicationModel.find(query).skip(skip).limit(PAGE_LIMIT)
				.populate('category', 'name')
				.populate('authors', 'name -_id'),
		]);
		this.logger.log(`Finding all publications with isShow: ${isShow} and page: ${page}`);
		return {
			data,
			total,
			totalPages: Math.ceil(total / PAGE_LIMIT),
		};
	}

	async findAllByCategory(
		mainCategoryId: string,
		authors: string[], // массив ID авторов
		startYear?: number,
		endYear?: number,
		hasFiles?: boolean, // новый параметр для проверки наличия файлов
		isShow?: boolean,
		page: number = 1,
	) {
		const skip = this.getSkip(page);
		const subCategories = await this.subCategoryModel.find({ mainCategory: mainCategoryId });

		const subCategoryIds = subCategories.map(subCategory => subCategory._id);

		const query: any = { category: { $in: subCategoryIds } };

		const groupName = await this.groupModel.findOne({ categories: mainCategoryId }).select('name');
		const categoryName = await this.categoryModel.findById(mainCategoryId).select('name');

		if (authors && authors.length > 0) {
			query['authors'] = { $in: authors };
		}

		if (startYear && endYear) {
			query['year'] = { $gte: startYear, $lte: endYear };
		}

		if (hasFiles !== undefined) {
			query['files'] = hasFiles ? { $exists: hasFiles, $not: { $size: 0 } } : { $size: 0 };
		}

		if (startYear && endYear) {
			query.year = { $gte: startYear, $lte: endYear };
		}
		if (isShow !== undefined) {
			query.isShow = isShow;
		}

		const [total, data] = await Promise.all([
			this.publicationModel.countDocuments(query),
			this.publicationModel
				.find(query)
				.skip(skip)
				.limit(PAGE_LIMIT)
				.populate('category', 'name')
				.populate('authors', 'name -_id'),
		]);
		this.logger.log(`Finding all publications by main category with id: ${mainCategoryId}`);

		return {
			data,
			total,
			totalPages: Math.ceil(total / PAGE_LIMIT),
			groupName,
			categoryName
		};
	}

	async findById(id: string) {
		this.logger.log(`Finding publication by id: ${id}`);
		const publication = await this.publicationModel.findById(id).populate('category', 'name');
		if (!publication) {
			this.logger.error(`Publication with id ${id} not found`);
			throw new NotFoundException(`Publication with id ${id} not found`);
		}
		return publication;
	}

	async create(publicationDto: PublicationDto) {
		const newPublication = new this.publicationModel(publicationDto);
		const savedPublication = await newPublication.save();
		this.logger.log(`Created publication with id: ${savedPublication.id}`);
		return savedPublication;
	}

	async addFiles(id: string, files: string[]) {
		const publication = await this.publicationModel.findById(id);
		if (!publication) {
			throw new NotFoundException(`Publication with id ${id} not found`);
		}
		publication.files.push(...files);
		return publication.save();
	}

	async removeFile(id: string, filename: string) {
		const publication = await this.publicationModel.findById(id);
		if (!publication) {
			throw new NotFoundException(`Publication with id ${id} not found`);
		}
		publication.files = publication.files.filter(file => file !== filename);
		return publication.save();
	}

	async update(id: string, publication: object) {
		this.logger.log(`Updating publication with id: ${id}`);
		const updatedPublication = await this.publicationModel.findByIdAndUpdate(id, publication, { new: true });
		if (!updatedPublication) {
			this.logger.error(`Publication with id ${id} not found`);
			throw new NotFoundException(`Publication with id ${id} not found`);
		}
		return updatedPublication;
	}

	async remove(id: string) {
		this.logger.log(`Deleting publication with id: ${id}`);
		const deletedPublication = await this.publicationModel.findByIdAndRemove(id);
		if (!deletedPublication) {
			this.logger.error(`Publication with id ${id} not found`);
			throw new NotFoundException(`Publication with id ${id} not found`);
		}
		return deletedPublication;
	}
}
