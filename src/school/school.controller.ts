import {
	Body,
	Controller,
	Delete,
	Get, Logger,
	Param, ParseIntPipe,
	ParseUUIDPipe,
	Post,
	Put,
	Query, UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/create.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateSchoolDto } from './dto/update.dto';
import { ApiRoles } from '../decorators/api-roles.decorator';
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('School')
@Controller('school')
export class SchoolController {
	private logger = new Logger('CityController');
	constructor(private readonly schoolService: SchoolService) {
	}

	@UsePipes(ValidationPipe)
	@ApiOperation({ summary: 'Create new school' })
	@ApiResponse({ status: 200, description: 'Returns new school info.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiRoles('ADMIN')
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post()
	async create(@Body() createSchoolDto: CreateSchoolDto) {
		return this.schoolService.create(createSchoolDto);
	}

	@ApiOperation({ summary: 'Get al schools' })
	@ApiResponse({ status: 200, description: 'Returns new list all schools.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiRoles('ADMIN')
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Get()
	async findAll(
		@Query('isShow') isShow: boolean,
		@Query('page', new ParseIntPipe()) page: number,
	) {
		this.logger.log(`Getting all cities with isShow: ${isShow} and page: ${page}`);
		return this.schoolService.findAll(isShow, page);
	}

	@ApiOperation({ summary: 'Get list of schools' })
	@ApiQuery({ name: 'isShow', type: Boolean, required: true, example: [true, false] })
	@ApiResponse({ status: 200, description: 'Returns the list of all cities.' })
	@Roles('ALL ROLES')
	@Get('list')
	async findAllList(@Query('isShow') isShow: boolean) {
		this.logger.log(`Getting all cities list with isShow: ${isShow}`);
		return this.schoolService.findAllList(isShow);
	}

	@UsePipes(ValidationPipe)
	@ApiOperation({ summary: 'Get one school' })
	@ApiResponse({ status: 200, description: 'Get one school by id.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@ApiRoles('ADMIN')
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@ApiParam({ name: 'id', required: true, example: '651335b63daf69f9f05dd4b0' })
	@Get(':id')
	async findById(@Param('id', new ParseUUIDPipe()) id: string) {
		return this.schoolService.findById(id);
	}

	@ApiOperation({ summary: 'Get one school' })
	@ApiResponse({ status: 200, description: 'Returns one school info.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@ApiRoles('ADMIN')
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@ApiParam({ name: 'id', required: true, example: '651335b63daf69f9f05dd4b0' })
	@ApiQuery({ name: 'type', required: true, example: 'School' })
	@Get('city/:id')
	async findByCity(@Param('id') id: string, @Query('type') type: string) {
		return this.schoolService.findByCity(id, type);
	}

	@UsePipes(ValidationPipe)
	@ApiOperation({ summary: 'Update role' })
	@ApiResponse({ status: 200, description: 'Returns updated role info.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@ApiRoles('ADMIN')
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@UsePipes(new ValidationPipe())
	@Put(':id')
	async update(@Param('id') id: string, @Body() updateSchoolDto: UpdateSchoolDto) {
		return this.schoolService.update(id, updateSchoolDto);
	}

	@ApiOperation({ summary: 'Delete role' })
	@ApiResponse({ status: 200, description: 'Ok' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@ApiRoles('ADMIN')
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.schoolService.delete(id);
	}
}
