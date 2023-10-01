import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
	) {
	}

	async login(user) {
		const { role, id } = user.user ;
		return {
			access_token: await this.jwtService.signAsync({role, id}),
		};
	}
}
