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
	Logger, UseGuards,
} from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { ALREADY_EXIST_ERROR } from '../category/category.constants';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateSubCategoryDto } from './dto/create.sub-category.dto';
import { ApiRoles } from '../decorators/api-roles.decorator';
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('Sub-category')
@Controller('sub-category')
export class SubCategoryController {
	private readonly logger = new Logger(SubCategoryController.name);

	constructor(private readonly subCategoryService: SubCategoryService) {}

	@UsePipes(ValidationPipe)
	@ApiOperation({ summary: 'Create new sub-category' })
	@ApiResponse({ status: 200, description: 'Returns new sub-category info.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiRoles('ADMIN')
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
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

	@ApiOperation({ summary: 'Get all sub-categories' })
	@ApiResponse({ status: 200, description: 'Returns list of all sub-categories.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiRoles('ADMIN')
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Get()
	async findAll(@Query('isShow') isShow: boolean) {
		return this.subCategoryService.findAll(isShow);
	}

	@UsePipes(ValidationPipe)
	@ApiOperation({ summary: 'Get one sub-category' })
	@ApiResponse({ status: 200, description: 'Returns one sub-category info.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@ApiRoles('ADMIN')
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Get(':id')
	async findById(@Param('id') id: string) {
		return this.subCategoryService.findById(id);
	}

	@UsePipes(ValidationPipe)
	@ApiOperation({ summary: 'Update sub-category' })
	@ApiResponse({ status: 200, description: 'Returns updated sub-category.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@ApiRoles('ADMIN')
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@Put(':id')
	async update(@Param('id') id: string, @Body() updateDto: { isCheck: boolean }) {
		return this.subCategoryService.update(id, updateDto.isCheck);
	}

	@UsePipes(ValidationPipe)
	@ApiOperation({ summary: 'Delete sub-category' })
	@ApiResponse({ status: 200, description: 'OK.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@ApiRoles('ADMIN')
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.subCategoryService.delete(id);
	}
}
