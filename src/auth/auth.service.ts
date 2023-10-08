import { Get, Injectable, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RoleService } from '../role/role.service';
import { UserService } from '../user/user.service';
import { AuthGuard } from '@nestjs/passport';
import { AvatarGeneratorService } from '../avatar-generator/avatar-generator.service';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly roleService: RoleService,
		private readonly userService: UserService,
		private readonly avatarGeneratorService: AvatarGeneratorService,
	) {}

	async login(user: any) {
		const { role, id, fullName } = user.user;
		const { name } = await this.roleService.findOne(role);
		const token = await this.jwtService.signAsync({ id });
		return { token, role: name, fullName, id };
	}

	async loginWithGoogle(user: any, @Res() res) {
		const { email, firstName, lastName, avatar } = user;
		const salt = await genSalt(10);
		const login = await hash(email, salt);
		const userRecord = await this.userService.findOrCreateUser({
			email,
			login,
			withGoogle: true,
			fullName: `${firstName} ${lastName}`,
			avatar: avatar || this.avatarGeneratorService.generateRandomAvatar(),
		});
		const { role, id, fullName } = userRecord;
		const { name } = await this.roleService.findOne(role);
		const token = await this.jwtService.signAsync({ id });
		res.redirect(`${process.env.CLIENT_URL}/cabinet/${token}`);
		return { token, role: name, fullName, _id:id };
	}

	async getUserFromToken(token: string)
	{
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
