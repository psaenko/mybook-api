import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/create.dto';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateSchoolDto } from './dto/update.dto';

@ApiTags('School')
@Controller('school')
export class SchoolController {
	constructor(private SchoolService: SchoolService) {
	}

	@UsePipes(new ValidationPipe())
	@Post()
	async createSchool(@Body() CreateSchoolDto: CreateSchoolDto) {
		return this.SchoolService.createSchool(CreateSchoolDto);
	}

	@Get()
	async getAllSchools() {
		return this.SchoolService.getAllSchools();
	}

	@ApiParam({ name: 'id', required: true, example: '651335b63daf69f9f05dd4b0' })
	@Get(':id')
	async getSchoolById(@Param('id') id: string) {
		return this.SchoolService.getSchoolsById(id);
	}

	@ApiParam({ name: 'id', required: true, example: '651335b63daf69f9f05dd4b0' })
	@ApiQuery({ name: 'type', required: true, example: 'School' })
	@Get('city/:id')
	async getSchool(@Param('id') id: string, @Query('type') type: string) {
		return this.SchoolService.getSchoolsByCity(id, type);
	}

	@ApiParam({ name: 'id', required: true, example: '651335b63daf69f9f05dd4b0' })
	@UsePipes(new ValidationPipe())
	@Put(':id')
	async updateSchool(@Param('id') id: string, @Body() UpdateSchoolDto: UpdateSchoolDto) {
		return this.SchoolService.updateSchool(id, UpdateSchoolDto);
	}

	@ApiParam({ name: 'id', required: true, example: '651335b63daf69f9f05dd4b0' })
	@Delete(':id')
	async deleteSchool(@Param('id') id: string) {
		return this.SchoolService.deleteSchool(id);
	}
}
