import {
	Body,
	Controller,
	Delete,
	Get,
	Logger,
	Param,
	Post,
	Put,
	Query,
	ParseIntPipe,
	UsePipes,
	ValidationPipe, UseGuards,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupDto } from './dto/group.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiRoles } from '../decorators/api-roles.decorator';
import { Roles } from '../decorators/roles-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('Group')
@Controller('group')
export class PublicationController {
	private logger = new Logger('GroupController');

	constructor(private readonly groupService: GroupService) {
	}

	@UsePipes(new ValidationPipe())
	@ApiOperation({ summary: 'Creating new group' })
	@ApiResponse({ status: 200, description: 'Returns new group info.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiRoles('ADMIN')
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post()
	async create(@Body() groupDto: GroupDto) {
		return this.groupService.create(groupDto);
	}

	@ApiOperation({ summary: 'Get all groups' })
	@ApiResponse({ status: 200, description: 'Returns the list of all publications.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiQuery({ name: 'isShow', type: Boolean, required: true, example: [true, false] })
	@ApiQuery({ name: 'page', type: Number, required: true, example: 1 })
	@ApiRoles('ADMIN')
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Get()
	async findAll(
		@Query('isShow') isShow: boolean,
		@Query('page', new ParseIntPipe()) page: number,
	) {
		this.logger.log(`Getting all groups with isShow: ${isShow} and page: ${page}`);
		return this.groupService.findAll(isShow, page);
	}

	@ApiQuery({ name: 'isShow', type: Boolean, required: true, example: [true, false] })
	@ApiOperation({ summary: 'Get list of all groups' })
	@ApiResponse({ status: 200, description: 'Returns the list of all group.' })
	@ApiRoles('ALL ROLES')
	@Get('list')
	async findAllList(@Query('isShow') isShow: boolean) {
		this.logger.log(`Getting all groups list with isShow: ${isShow}`);
		return this.groupService.findAllList(isShow);
	}

	@ApiOperation({ summary: 'Get all categories by group' })
	@ApiResponse({ status: 200, description: 'Returns list of all categories' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@ApiRoles('ALL ROLES')
	@Get('/categories/:id')
	async gertCategories(@Param('id') id: string, @Query('isShow') isShow: boolean) {
		this.logger.log(`Getting all categories by group with id: ${id}`);
		return this.groupService.findCategoriesByGroup(id, isShow);
	}

	@ApiOperation({ summary: 'Get one group' })
	@ApiResponse({ status: 200, description: 'Returns one group.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@ApiRoles("ALL ROLES")
	@Get(':id')
	async findById(@Param('id') id: string) {
		this.logger.log(`Getting group by id: ${id}`);
		try {
			return await this.groupService.findById(id);
		} catch (error) {
			this.logger.error(`Error getting group by id: ${id} - ${(error as Error).message}`);
			throw error;
		}
	}

	@ApiOperation({ summary: 'Update group' })
	@ApiResponse({ status: 200, description: 'Returns the updated group.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@ApiRoles('ADMIN')
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Put(':id')
	async update(@Param('id') id: string, @Body() publication: Object) {
		this.logger.log(`Updating group with id: ${id}`);
		return this.groupService.update(id, publication);
	}

	@ApiOperation({ summary: 'Delete group' })
	@ApiResponse({ status: 200, description: 'Ok' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiParam({ name: 'id', required: true, example: '6512f25c770624afefed1293' })
	@ApiRoles('ADMIN')
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Delete(':id')
	async remove(@Param('id') id: string) {
		this.logger.log(`Deleting group with id: ${id}`);
		return this.groupService.remove(id);
	}
}
