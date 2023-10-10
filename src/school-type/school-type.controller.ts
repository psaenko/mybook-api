import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	BadRequestException,
	Logger,
	UsePipes,
	ValidationPipe, Query, ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { SchoolTypeService } from './school-type.service';
import { SchoolTypeDto } from './dto/school-type.dto';
import { ALREADY_EXIST_ERROR } from './school-type.constants';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiRoles } from '../decorators/api-roles.decorator';
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('School Type')
@Controller('school-type')
export class SchoolTypeController {
	private logger = new Logger('SchoolType');
	constructor(private readonly schoolTypeService: SchoolTypeService) {}

	@UsePipes(ValidationPipe)
	@ApiOperation({ summary: 'Create new school-type' })
	@ApiResponse({ status: 200, description: 'Returns new school-type info.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiRoles('ADMIN')
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post()
	async create(@Body() schoolTypeDto: SchoolTypeDto) {
		const oldRole = await this.schoolTypeService.findOne(schoolTypeDto.name);
		if (oldRole) {
			this.logger.error(`On created school-type: ${schoolTypeDto.name}. Error - ${ALREADY_EXIST_ERROR}`);
			throw new BadRequestException(ALREADY_EXIST_ERROR);
		}
		return this.schoolTypeService.create(schoolTypeDto);
	}

	@ApiOperation({ summary: 'Get all school-types' })
	@ApiResponse({ status: 200, description: 'Returns list of all school-types.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiRoles('ADMIN')
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Get()
	findAll(
		@Query('page', new ParseIntPipe()) page: number
	) {
		this.logger.log('Getting all roles');
		return this.schoolTypeService.findAll(page);
	}

	@ApiOperation({ summary: 'Get ole school-type by id' })
	@ApiResponse({ status: 200, description: 'Returns one school-type by id.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@ApiRoles('ADMIN')
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: string) {
		this.logger.log(`Getting role by id: ${id}`);
		return this.schoolTypeService.findOne(id);
	}

	@ApiOperation({ summary: 'Update school-type' })
	@ApiResponse({ status: 200, description: 'Returns updated school-type.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@ApiRoles('ADMIN')
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Patch(':id')
	update(@Param('id') id: string, @Body() role: Object) {
		this.logger.log(`Updating role with id: ${id}`);
		return this.schoolTypeService.update(id, role);
	}

	@ApiOperation({ summary: 'Delete school-type' })
	@ApiResponse({ status: 200, description: 'ok' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@ApiRoles('ADMIN')
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Delete(':id')
	delete(@Param('id') id: string) {
		this.logger.log(`Deleting role with id: ${id}`);
		return this.schoolTypeService.delete(id);
	}
}
