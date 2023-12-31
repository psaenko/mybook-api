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
import { RoleService } from './role.service';
import { RoleDto } from './dto/role.dto';
import { ALREADY_EXIST_ERROR } from './role.constants';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiRoles } from '../decorators/api-roles.decorator';
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('Role')
@Controller('role')
export class RoleController {
	private logger = new Logger('RoleController');

	constructor(private readonly roleService: RoleService) {}

	@UsePipes(ValidationPipe)
	@ApiOperation({ summary: 'Create new role' })
	@ApiResponse({ status: 200, description: 'Returns new role info.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiRoles('ADMIN')
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post()
	async create(@Body() roleDto: RoleDto) {
		const oldRole = await this.roleService.findOne(roleDto.name);
		if (oldRole) {
			this.logger.error(`On created role: ${roleDto.name}. Error - ${ALREADY_EXIST_ERROR}`);
			throw new BadRequestException(ALREADY_EXIST_ERROR);
		}
		return this.roleService.create(roleDto);
	}

	@ApiOperation({ summary: 'Get all roles new role' })
	@ApiResponse({ status: 200, description: 'Returns list of all roles.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiRoles('ADMIN')
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Get()
	findAll(
		@Query('page', new ParseIntPipe()) page: number,
		@Query('limit', new ParseIntPipe()) limit: number
	) {
		this.logger.log('Getting all roles');
		return this.roleService.findAll(page, limit);
	}

	@ApiOperation({ summary: 'Get ole role by id' })
	@ApiResponse({ status: 200, description: 'Returns one role by id.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@ApiRoles('ADMIN')
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Get(':id')
	findOne(@Param('id') id: string) {
		this.logger.log(`Getting role by id: ${id}`);
		return this.roleService.findOne(id);
	}

	@ApiOperation({ summary: 'update role' })
	@ApiResponse({ status: 200, description: 'Returns updated role.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@ApiRoles('ADMIN')
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Patch(':id')
	update(@Param('id') id: string, @Body() role: Object) {
		this.logger.log(`Updating role with id: ${id}`);
		return this.roleService.update(id, role);
	}

	@ApiOperation({ summary: 'Delete role' })
	@ApiResponse({ status: 200, description: 'ok' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@ApiRoles('ADMIN')
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Delete(':id')
	delete(@Param('id') id: string) {
		this.logger.log(`Deleting role with id: ${id}`);
		return this.roleService.delete(id);
	}
}
