import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { compare, genSalt, hash } from 'bcrypt';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from '../auth/auth.constants';
import { JwtService } from '@nestjs/jwt';
import { RoleService } from '../role/role.service';
import { LoginDto } from '../auth/dto/login.dto';
import { AvatarGeneratorService } from '../avatar-generator/avatar-generator.service'

const PAGE_LIMIT = 10;

@Injectable()
export class UserService {
	private logger = new Logger('CityService');
	constructor(@InjectModel(User.name)
							private userModel: Model<UserDocument>,
							private readonly jwtService: JwtService,
							private readonly roleService: RoleService,
							private readonly avatarGeneratorService: AvatarGeneratorService,
	) {
	}

	private async generateToken(user: any) {
		const { role, id, fullName } = user;
		const { name } = await this.roleService.findOne(role);
		const token = await this.jwtService.signAsync({ id });
		return { token, role: name, fullName, id};
	}

	async create(createUserDto: CreateUserDto) {
		const salt = await genSalt(10);
		const passwordHash = await hash(createUserDto.password, salt);
		const avatar = this.avatarGeneratorService.generateRandomAvatar()
		const user = await new this.userModel({
			...createUserDto,
			passwordHash,
			avatar
		}).save();
		return this.generateToken(user);
	}

	private getSkip(page: number): number {
		return (page - 1) * PAGE_LIMIT;
	}

	async findAll(isShow?: boolean, page: number = 1) {
		const skip = this.getSkip(page);
		const query = isShow !== undefined ? { isShow } : {};
		const [total, data] = await Promise.all([
			this.userModel.countDocuments(query),
			this.userModel.find(query).skip(skip).limit(PAGE_LIMIT).populate('role', 'name -_id'),
		]);
		this.logger.log(`Finding all cities with isShow: ${isShow} and page: ${page}`);
		return {
			data,
			total,
			totalPages: Math.ceil(total / PAGE_LIMIT),
		};
	}

	findById(id: string): any {
		return this.userModel.findById(id);
	}

	async findByLogin(login: string) {
		return this.userModel.findOne({ login }).exec();
	}

	async findByMail(mail: string) {
		return this.userModel.findOne({ mail }).exec();
	}

	async validateUser(loginDto: LoginDto) {
		let user = await this.findByLogin(loginDto.login);
		if (!user) {
			throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
		}

		const isCorrectPassword = await compare(loginDto.password, user.passwordHash);
		if (!isCorrectPassword) {
			throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
		}

		return { user: user };

	}
}
