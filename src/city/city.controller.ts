import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create.dto';
import { Schema } from 'mongoose';
import { ApiOperation, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { City } from './city.model';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@ApiTags('City')
@Controller('city')
export class CityController {
	constructor(private cityService: CityService) {
	}

	@UsePipes(new ValidationPipe())
	@Post()
	async createCity(@Body() CreateCityDto: CreateCityDto) {
		return this.cityService.createCity(CreateCityDto);
	}

	@Get()
	async getAllCities() {
		return this.cityService.getAllCities();
	}

	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@Get(':id')
	async getCity(@Param('id') id: string) {
		return this.cityService.getCity(id);
	}

	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@Put(':id')
	async updateCity(@Param('id') id: string, @Body() city: City) {
		return this.cityService.updateCity(id, city);
	}

	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@Delete(':id')
	async deleteCity(@Param() id: string) {
		return this.cityService.deleteCity(id);
	}
}
