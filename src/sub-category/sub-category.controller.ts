import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UsePipes,
	ValidationPipe,
	BadRequestException,
	Query,
	Put,
	Logger,
} from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { SubCategoryDto } from './dto/sub-category.dto';
import { ALREADY_EXIST_ERROR } from '../category/category.constants';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { CreateSubCategoryDto } from './dto/create.sub-category.dto';

@ApiTags('Sub-category')
@Controller('sub-category')
export class SubCategoryController {
	private readonly logger = new Logger(SubCategoryController.name);

	constructor(private readonly subCategoryService: SubCategoryService) {}

	@UsePipes(new ValidationPipe())
	@Post()
	async create(@Body() createSubCategoryDto: CreateSubCategoryDto) {
		const existingSubCategory = await this.subCategoryService.findByName(createSubCategoryDto.name);
		if (existingSubCategory) {
			this.logger.error(`On created sub-category: ${createSubCategoryDto.name}. Error - ${ALREADY_EXIST_ERROR}`);
			throw new BadRequestException(ALREADY_EXIST_ERROR);
		}
		return this.subCategoryService.create(createSubCategoryDto);
	}

	@Get()
	async findAll(@Query('isShow') isShow: boolean) {
		return this.subCategoryService.findAll(isShow);
	}

	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@Get(':id')
	async findById(@Param('id') id: string) {
		return this.subCategoryService.findById(id);
	}

	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@Put(':id')
	async update(@Param('id') id: string, @Body() updateDto: { isCheck: boolean }) {
		return this.subCategoryService.update(id, updateDto.isCheck);
	}

	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.subCategoryService.delete(id);
	}
}
