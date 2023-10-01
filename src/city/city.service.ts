import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { CityDocument, City } from './city.model';
import { CreateCityDto } from './dto/create.dto';

@Injectable()
export class CityService {
	constructor(@InjectModel(City.name) private cityModel: Model<CityDocument>) {
	}

	async getAllCities() {
		return await this.cityModel.find();
	}

	async getCity(id: string) {
		return await this.cityModel.findById(id);
	}

	async createCity(CreateCityDto: CreateCityDto) {
		const newCity = await new this.cityModel(CreateCityDto);
		return newCity.save();
	}

	async updateCity(id: string, city: City) {
		return await this.cityModel.findByIdAndUpdate(id, city, { new: true });
	}

	async deleteCity(id: string) {
		return await this.cityModel.findByIdAndRemove(id);
	}
}
