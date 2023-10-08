import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { City, CityDocument } from './city.schema';
import { CreateDto, UpdateDto } from './dto/city.dto';

const PAGE_LIMIT = 10;

@Injectable()
export class CityService {
	private logger = new Logger('CityService');
	constructor(@InjectModel(City.name) private readonly cityModel: Model<CityDocument>) {}

	private getSkip(page: number): number {
		return (page - 1) * PAGE_LIMIT;
	}

	async findAll(isShow?: boolean, page: number = 1) {
		const skip = this.getSkip(page);
		const query = isShow !== undefined ? { isShow } : {};
		const [total, data] = await Promise.all([
			this.cityModel.countDocuments(query),
			this.cityModel.find(query).skip(skip).limit(PAGE_LIMIT),
		]);
		this.logger.log(`Finding all cities with isShow: ${isShow} and page: ${page}`);
		return {
			data,
			total,
			totalPages: Math.ceil(total / PAGE_LIMIT),
		};
	}

	async findAllList(isShow?: boolean): Promise<CityDocument[]> {
		const query = isShow !== undefined ? { isShow } : {};
		this.logger.log(`Finding all cities list with isShow: ${isShow}`);
		return this.cityModel.find(query).exec();
	}

	async findByName(name: string): Promise<CityDocument> {
		this.logger.log(`Finding city by name: ${name}`);
		return this.cityModel.findOne({ name }).exec();
	}

	async findById(id: string): Promise<CityDocument> {
		this.logger.log(`Finding city by id: ${id}`);
		const city = await this.cityModel.findById(id).exec();
		if (!city) {
			throw new NotFoundException(`City with id ${id} not found`);
		}
		return city;
	}

	async create(createDto: CreateDto): Promise<CityDocument> {
		const newCity = new this.cityModel(createDto);
		this.logger.log(`Creating a new city with name: ${createDto.name}`);
		return newCity.save();
	}

	async update(id: string, updateDto: UpdateDto) {
		this.logger.log(`Updating city: ${id}`);
		const updatedCity = await this.cityModel.findByIdAndUpdate(id, updateDto , { new: true }).exec();
		if (!updatedCity) {
			throw new NotFoundException(`City with id ${id} not found`);
		}
		return updatedCity;
	}

	async remove(id: string): Promise<CityDocument> {
		this.logger.log(`Deleting city: ${id}`);
		const deletedCity = await this.cityModel.findByIdAndRemove(id).exec();
		if (!deletedCity) {
			throw new NotFoundException(`City with id ${id} not found`);
		}
		return deletedCity;
	}
}
