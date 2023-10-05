import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RoleService } from '../role/role.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly roleService: RoleService,
		private readonly userService: UserService
	) {}

	async login(user: any) {
		const { role, id, fullName } = user.user;
		const { name } = await this.roleService.findOne(role);
		const token = await this.jwtService.signAsync({ id });
		return { token, role: name, fullName, id };
	}

	async getUserFromToken(token: string) {
		try {
			const decodedToken = this.jwtService.verify(token);
			const userId = decodedToken.id;
			const user = await this.userService.findById(userId)
				.populate('city', 'name -_id')
				.populate('school', 'name -_id')
				.populate('role', 'name -_id')
				.select('-passwordHash')
				.exec();

			if (!user) {
				throw new UnauthorizedException('User not found');
			}
			return user;
		} catch (error) {
			throw new UnauthorizedException('Invalid token');
		}
	}
}
