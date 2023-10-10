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
	Logger, UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateDto, UpdateDto } from './dto/category.dto';
import { ALREADY_EXIST_ERROR } from './category.constants';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles-auth.decorator';
import { ApiRoles } from '../decorators/api-roles.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
	private readonly logger = new Logger(CategoryController.name);

	constructor(private readonly categoryService: CategoryService) {
	}

	@ApiBearerAuth()
	@UsePipes(new ValidationPipe())
	@ApiOperation({ summary: 'Creating new category' })
	@ApiResponse({ status: 200, description: 'Returns nwe category info.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiRoles('ADMIN')
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post()
	async createCategory(@Body() createDto: CreateDto) {
		const existingCategory = await this.categoryService.findByName(createDto.name);
		if (existingCategory) {
			this.logger.error(`On created category: ${createDto.name}. Error - ${ALREADY_EXIST_ERROR}`);
			throw new BadRequestException(ALREADY_EXIST_ERROR);
		}
		return this.categoryService.create(createDto);
	}

	@ApiBearerAuth()
	@ApiOperation({ summary: 'Get all categories' })
	@ApiResponse({ status: 200, description: 'Returns the list of all categories.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiQuery({ name: 'isShow', type: Boolean, required: true, example: [true, false] })
	@ApiRoles('ALL ROLES')
	@Get()
	async getAllCategories(@Query('isShow') isShow: boolean) {
		this.logger.log(`Getting all categories with isShow: ${isShow}`);
		return this.categoryService.findAll(isShow);
	}

	@ApiBearerAuth()
	@ApiOperation({ summary: 'Get category by id' })
	@ApiResponse({ status: 200, description: 'Returns one category.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiParam({ name: '_id', required: true, type: Number, example: '6512f25c770624afefed1293' })
	@ApiRoles('ADMIN')
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
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

	@ApiBearerAuth()
	@ApiOperation({ summary: 'Update category' })
	@ApiResponse({ status: 200, description: 'Returns the updated category.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiParam({ name: 'page', required: true, type: Number, example: '6512f25c770624afefed1293' })
	@ApiRoles('ADMIN')
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Put(':id')
	async updateCategory(@Param('id') id: string, @Body() updateDto: UpdateDto) {
		this.logger.log(`Updating category with id: ${id}`);
		return this.categoryService.update(id, updateDto.isShow);
	}

	@ApiBearerAuth()
	@ApiOperation({ summary: 'Delete category' })
	@ApiResponse({ status: 200, description: 'Ok' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiParam({ name: 'page', required: true, type: Number, example: '6512f25c770624afefed1293' })
	@ApiRoles('ADMIN')
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Delete(':id')
	async remove(@Param('id') id: string) {
		this.logger.log(`Deleting category with id: ${id}`);
		return this.categoryService.delete(id);
	}
}
