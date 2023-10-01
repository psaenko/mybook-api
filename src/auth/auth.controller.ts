import { BadRequestException, Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly userService: UserService, private readonly authService: AuthService) {
	}

	@HttpCode(200)
	@Post('login')
	async login(@Body() { login, password }: LoginDto) {
		const user = await this.userService.validateUser(login, password);
		return this.authService.login(user)
	}

}
