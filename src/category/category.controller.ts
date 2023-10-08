import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	UsePipes,
	ValidationPipe,
	BadRequestException,
	Query,
	Put,
	Logger,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateDto, UpdateDto } from './dto/category.dto';
import { ALREADY_EXIST_ERROR } from './category.constants';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
	private readonly logger = new Logger(CategoryController.name);

	constructor(private readonly categoryService: CategoryService) {
	}

	@UsePipes(new ValidationPipe())
	@Post()
	async createCategory(@Body() createDto: CreateDto) {
		const existingCategory = await this.categoryService.findByName(createDto.name);
		if (existingCategory) {
			this.logger.error(`On created category: ${createDto.name}. Error - ${ALREADY_EXIST_ERROR}`);
			throw new BadRequestException(ALREADY_EXIST_ERROR);
		}
		return this.categoryService.create(createDto);
	}

	@Get()
	async getAllCategories(@Query('isShow') isShow: boolean) {
		this.logger.log(`Getting all categories with isShow: ${isShow}`);
		return this.categoryService.findAll(isShow);
	}

	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@Get(':id')
	async findById(@Param('id') id: string) {
		this.logger.log(`Getting category by id: ${id}`);
		try {
			return await this.categoryService.findById(id);
		} catch (error) {
			this.logger.error(`Error getting category by id: ${id} - ${(error as Error).message}`);
			throw error;
		}
	}

	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@Put(':id')
	async updateCategory(@Param('id') id: string, @Body() updateDto: UpdateDto) {
		this.logger.log(`Updating category with id: ${id}`);
		return this.categoryService.update(id, updateDto.isShow);
	}

	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@Delete(':id')
	async remove(@Param('id') id: string) {
		this.logger.log(`Deleting category with id: ${id}`);
		return this.categoryService.delete(id);
	}
}
