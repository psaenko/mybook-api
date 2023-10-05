import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Logger, ParseIntPipe,
	Post,
	Query,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { ALREADY_REGISTERED_ERROR } from '../auth/auth.constants';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
	private logger = new Logger('UserController')

	constructor(private readonly userService: UserService) {
	}

	@UsePipes(new ValidationPipe())
	@Post()
	async create(@Body() createUserDto: CreateUserDto) {
		const oldUser = await this.userService.findByLogin(createUserDto.login);
		if (oldUser) {
			this.logAndThrowError(createUserDto, ALREADY_REGISTERED_ERROR);
		}
		this.logger.verbose(`Created user: ${createUserDto.fullName} (${createUserDto.login})`);
		return this.userService.create(createUserDto);
	}

	private logAndThrowError(createUserDto: CreateUserDto, error: string) {
		this.logger.error(`On created user: ${createUserDto.fullName} (${createUserDto.login}). Error - ${error}`);
		throw new BadRequestException(error);
	}

	@Get()
	async findAll(
		@Query('isShow') isShow: boolean,
		@Query('page', new ParseIntPipe()) page: number,
	) {
		this.logger.log(`Getting all cities with isShow: ${isShow} and page: ${page}`);
		return this.userService.findAll(isShow, page);
	}
}
