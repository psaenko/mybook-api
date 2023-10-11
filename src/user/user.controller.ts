import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Logger, Param, ParseIntPipe, Patch,
	Post,
	Query, UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { CreateDto, UpdateDto, ChangePasswordDto } from './dto/user.dto';
import { ALREADY_REGISTERED_ERROR } from '../auth/auth.constants';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles-auth.decorator';
import { ApiRoles } from '../decorators/api-roles.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
	private logger = new Logger('UserController');

	constructor(private readonly userService: UserService) {
	}

	@ApiBearerAuth()
	@ApiOperation({ summary: 'Create a new user (register)' })
	@ApiResponse({ status: 201, description: 'The user has been successfully created.' })
	@ApiResponse({ status: 400, description: 'User already exists or invalid data.' })
	@ApiRoles('ALL ROLES')
	@UsePipes(new ValidationPipe())
	@Post()
	async create(@Body() createDto: CreateDto) {
		const oldUser = await this.userService.findByLogin(createDto.login);
		if (oldUser) {
			this.logAndThrowError(createDto, ALREADY_REGISTERED_ERROR);
		}
		this.logger.verbose(`Created user: ${createDto.fullName} (${createDto.login})`);
		return this.userService.create(createDto);
	}

	@ApiBearerAuth()
	@ApiOperation({ summary: 'Save publication' })
	@ApiResponse({ status: 201, description: 'The publication has been successfully saved.' })
	@ApiRoles('ADMIN', 'USER')
	@Roles('ADMIN', 'USER')
	@UseGuards(RolesGuard)
	@Post('/save/:id')
	async savePublication(@Body('publicationId') publicationId: string, @Param('id') id: string) {
		return this.userService.savePublication(id, publicationId);
	}

	private logAndThrowError(createDto: CreateDto, error: string) {
		this.logger.error(`On created user: ${createDto.fullName} (${createDto.login}). Error - ${error}`);
		throw new BadRequestException(error);
	}

	@ApiBearerAuth()
	@ApiOperation({ summary: 'Get all users' })
	@ApiResponse({ status: 200, description: 'Returns the list of all users.' })
	@ApiResponse({ status: 403, description: 'Forbidden.' })
	@ApiQuery({ name: 'isShow', type: Boolean, required: true, example: [true, false] })
	@ApiParam({ name: 'page', required: true, type: Number, example: 1 })
	@ApiRoles('ADMIN')
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Get()
	async findAll(
		@Query('isShow') isShow: boolean,
		@Query('page', new ParseIntPipe()) page: number,
	) {
		this.logger.log(`Getting all cities with isShow: ${isShow} and page: ${page}`);
		return this.userService.findAll(isShow, page);
	}

	@ApiBearerAuth()
	@ApiOperation({ summary: 'Change user password' })
	@ApiResponse({ status: 200, description: 'Password changed successfully.' })
	@ApiResponse({ status: 400, description: 'Incorrect old password or bad request.' })
	@ApiResponse({ status: 404, description: 'User not found.' })
	@ApiRoles('ADMIN', 'USER')
	@Roles('ADMIN', 'USER')
	@UseGuards(RolesGuard)
	@Patch('/change-password/:id')
	async changePassword(
		@Param('id') id: string,
		@Body() changePasswordDto: ChangePasswordDto,
	) {
		return this.userService.changePassword(id, changePasswordDto);
	}

	@ApiBearerAuth()
	@ApiOperation({ summary: 'Update user details' })
	@ApiResponse({ status: 200, description: 'The user details have been successfully updated.' })
	@ApiResponse({ status: 400, description: 'Bad request.' })
	@ApiResponse({ status: 404, description: 'User not found.' })
	@ApiRoles('ADMIN', 'USER')
	@Roles('ADMIN', 'USER')
	@UseGuards(RolesGuard)
	@Patch('/:id')
	async update(
		@Param('id') id: string,
		@Body() updateDto: UpdateDto,
	) {
		return this.userService.update(id, updateDto);
	}

	@ApiBearerAuth()
	@ApiOperation({ summary: 'Get saved publications by user' })
	@ApiResponse({ status: 200, description: 'Returned list of saved publications' })
	@ApiResponse({ status: 400, description: 'Bad request.' })
	@ApiResponse({ status: 404, description: 'User not found.' })
	@ApiRoles('ADMIN', 'USER')
	@Roles('ADMIN', 'USER')
	@UseGuards(RolesGuard)
	@Get('/saved-publications/:id')
	async getSavedPublications(@Param('id') userId: string) {
		return this.userService.getSavedPublications(userId);
	}
}
