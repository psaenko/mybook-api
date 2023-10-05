import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/create.dto';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateSchoolDto } from './dto/update.dto';

@ApiTags('School')
@Controller('school')
export class SchoolController {
	constructor(private readonly schoolService: SchoolService) {
	}

	@UsePipes(new ValidationPipe())
	@Post()
	async create(@Body() createSchoolDto: CreateSchoolDto) {
		return this.schoolService.create(createSchoolDto);
	}

	@Get()
	async findAll() {
		return this.schoolService.findAll();
	}

	@ApiParam({ name: 'id', required: true, example: '651335b63daf69f9f05dd4b0' })
	@Get(':id')
	async findById(@Param('id', new ParseUUIDPipe()) id: string) {
		return this.schoolService.findById(id);
	}

	@ApiParam({ name: 'id', required: true, example: '651335b63daf69f9f05dd4b0' })
	@ApiQuery({ name: 'type', required: true, example: 'School' })
	@Get('city/:id')
	async findByCity(@Param('id') id: string, @Query('type') type: string) {
		return this.schoolService.findByCity(id, type);
	}

	@ApiParam({ name: 'id', required: true, example: '651335b63daf69f9f05dd4b0' })
	@UsePipes(new ValidationPipe())
	@Put(':id')
	async update(@Param('id') id: string, @Body() updateSchoolDto: UpdateSchoolDto) {
		return this.schoolService.update(id, updateSchoolDto);
	}

	@ApiParam({ name: 'id', required: true, example: '651335b63daf69f9f05dd4b0' })
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.schoolService.delete(id);
	}
}
