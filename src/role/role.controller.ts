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
	ValidationPipe, Query, ParseIntPipe,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from './dto/role.dto';
import { ALREADY_EXIST_ERROR } from './role.constants';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Role')
@Controller('role')
export class RoleController {
	private logger = new Logger('RoleController');

	constructor(private readonly roleService: RoleService) {}

	@UsePipes(new ValidationPipe())
	@Post()
	async create(@Body() roleDto: RoleDto) {
		const oldRole = await this.roleService.findOne(roleDto.name);
		if (oldRole) {
			this.logger.error(`On created role: ${roleDto.name}. Error - ${ALREADY_EXIST_ERROR}`);
			throw new BadRequestException(ALREADY_EXIST_ERROR);
		}
		return this.roleService.create(roleDto);
	}

	@Get()
	findAll(
		@Query('page', new ParseIntPipe()) page: number,
		@Query('limit', new ParseIntPipe()) limit: number
	) {
		this.logger.log('Getting all roles');
		return this.roleService.findAll(page, limit);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		this.logger.log(`Getting role by id: ${id}`);
		return this.roleService.findOne(id);
	}

	@UsePipes(new ValidationPipe())
	@Patch(':id')
	update(@Param('id') id: string, @Body() role: Object) {
		this.logger.log(`Updating role with id: ${id}`);
		return this.roleService.update(id, role);
	}

	@Delete(':id')
	delete(@Param('id') id: string) {
		this.logger.log(`Deleting role with id: ${id}`);
		return this.roleService.delete(id);
	}
}
