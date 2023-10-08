import {
	BadRequestException,
	Body,
	Controller,
	HttpCode,
	Post,
	Get,
	UseGuards,
	UsePipes,
	Headers,
	ValidationPipe,
	Req, Res,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ApiRoles } from '../decorators/api-roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthGuard } from '../guards/google-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(
		private readonly userService: UserService,
		private readonly authService: AuthService,
	) {}

	@HttpCode(200)
	@Post('login')
	@ApiRoles('All ROLES')
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
	@ApiRoles('All ROLES')
	@Get()
	async getUserInfo(@Headers('authorization') authHeader: string) {
		const token = authHeader.split(' ')[1];
		return await this.authService.getUserFromToken(token);
	}

	@Get('google')
	@UseGuards(GoogleAuthGuard)
	googleLogin() {}

	@Get('google/callback')
	@UseGuards(GoogleAuthGuard)
	async googleLoginCallback(@Req() req, @Res() res) {
		const authResponse = await this.authService.loginWithGoogle(req.user, res);
		return authResponse;
	}
}
