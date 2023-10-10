import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author, AuthorDocument } from './author.schema';
import { CreateDto, UpdateDto } from './dto/author.dto';
import { ALREADY_EXIST_ERROR, NOT_FOUND_ERROR } from '../auth/author.constants';

const PAGE_LIMIT = 10;

@Injectable()
export class AuthorService {
	private readonly logger = new Logger(AuthorService.name);
	constructor(@InjectModel(Author.name) private authorModel: Model<AuthorDocument>) {}

	async create(createDto: CreateDto) {
		const existingAuthor = await this.authorModel.findOne({ name: createDto.name });
		if (existingAuthor) {
			throw new BadRequestException(ALREADY_EXIST_ERROR);
		}
		const author = new this.authorModel(createDto);
		return author.save();
	}

	private getSkip(page: number): number {
		return (page - 1) * PAGE_LIMIT;
	}

	async findAll(page: number = 1) {
		const skip = this.getSkip(page);
		const [total, data] = await Promise.all([
			this.authorModel.countDocuments(),
			this.authorModel.find().skip(skip).limit(PAGE_LIMIT),
		]);
		this.logger.log(`Finding all authors on page: ${page}`);
		return {
			data,
			total,
			totalPages: Math.ceil(total / PAGE_LIMIT),
		};
	}

	async findById(id: string) {
		const author = await this.authorModel.findById(id);
		if (!author) {
			throw new NotFoundException(NOT_FOUND_ERROR);
		}
		return author;
	}

	async update(id: string, updateDto: UpdateDto) {
		return this.authorModel.findByIdAndUpdate(id, updateDto, { new: true });
	}

	async remove(id: string) {
		return this.authorModel.findByIdAndRemove(id);
	}
}
