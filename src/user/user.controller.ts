import { BadRequestException, Body, Controller, Logger, Post, UsePipes, ValidationPipe } from '@nestjs/common';
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
	@Post('create')
	async register(@Body() dto: CreateUserDto) {
		const oldUser = await this.userService.findUser(dto.login);
		if (oldUser) {
			this.logger.error(`On created user: ${dto.fullName} (${dto.login}). Error - ${ALREADY_REGISTERED_ERROR}`)
			throw new BadRequestException(ALREADY_REGISTERED_ERROR);
		}
		this.logger.verbose(`Created user: ${dto.fullName} (${dto.login})`)
		return this.userService.createUser(dto);
	}
}
