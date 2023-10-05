import { BadRequestException, Body, Controller, HttpCode, Post, Get, UseGuards, UsePipes, Headers, ValidationPipe } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(
		private readonly userService: UserService,
		private readonly authService: AuthService,
	) {}

	@HttpCode(200)
	@Post('login')
	@UsePipes(new ValidationPipe())
	async login(@Body() loginDto: LoginDto) {
		const user = await this.userService.validateUser(loginDto);
		if (!user) {
			throw new BadRequestException('Invalid credentials');
		}
		return this.authService.login(user);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get()
	async getUserInfo(@Headers('authorization') authHeader: string) {
		const token = authHeader.split(' ')[1];
		return await this.authService.getUserFromToken(token);
	}
}
