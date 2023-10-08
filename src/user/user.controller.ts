import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Logger, ParseIntPipe,
	Post,
	Query, UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { CreateDto, UpdateDto } from './dto/user.dto';
import { ALREADY_REGISTERED_ERROR } from '../auth/auth.constants';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { ApiRoles } from '../decorators/api-roles.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
	private logger = new Logger('UserController')

	constructor(private readonly userService: UserService) {
	}

	@ApiBearerAuth()
	@ApiOperation({ summary: 'Create a new user' })
	@ApiResponse({ status: 201, description: 'The user has been successfully created.' })
	@ApiResponse({ status: 400, description: 'User already exists or invalid data.' })
	@Post()
	@UsePipes(new ValidationPipe())
	async create(@Body() createDto: CreateDto) {
		const oldUser = await this.userService.findByLogin(createDto.login);
		if (oldUser) {
			this.logAndThrowError(createDto, ALREADY_REGISTERED_ERROR);
		}
		this.logger.verbose(`Created user: ${createDto.fullName} (${createDto.login})`);
		return this.userService.create(createDto);
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
	@Roles('ADMIN')
	@ApiRoles('ADMIN')
	@UseGuards(JwtAuthGuard)
	@Get()
	async findAll(
		@Query('isShow') isShow: boolean,
		@Query('page', new ParseIntPipe()) page: number,
	) {
		this.logger.log(`Getting all cities with isShow: ${isShow} and page: ${page}`);
		return this.userService.findAll(isShow, page);
	}
}
