import { BadRequestException, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model, Types } from 'mongoose';
import { CreateDto, UpdateDto, ChangePasswordDto } from './dto/user.dto';
import { compare, genSalt, hash } from 'bcrypt';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from '../auth/auth.constants';
import { JwtService } from '@nestjs/jwt';
import { RoleService } from '../role/role.service';
import { LoginDto } from '../auth/dto/login.dto';
import { AvatarGeneratorService } from '../avatar-generator/avatar-generator.service';

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
		const token = await this.jwtService.signAsync({ id, role: name });
		return { token, role: name, fullName, id };
	}

	async create(createDto: CreateDto) {
		const salt = await genSalt(10);
		const passwordHash = await hash(createDto.password, salt);
		const avatar = this.avatarGeneratorService.generateRandomAvatar();
		const user = await new this.userModel({
			...createDto,
			passwordHash,
			avatar,
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

	async findOrCreateUser(userDto: any): Promise<any> {
		let user = await this.userModel.findOne({ email: userDto.email }).exec();
		if (!user) {
			user = await new this.userModel(userDto).save();
		}
		return user;
	}

	findRoleById(id: string): any {
		return this.userModel.findById(id).select('role');
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

	async savePublication(id: string, publicationId: string) {
		const user = await this.userModel.findById(id);
		if (!user) {
			throw new NotFoundException(`User with id ${id} not found`);
		}
		user.saved.push(new Types.ObjectId(publicationId));
		return user.save();
	}

	async isLoginUnique(login: string): Promise<boolean> {
		const user = await this.userModel.findOne({ login });
		return !user;
	}

	async isEmailUnique(email: string): Promise<boolean> {
		const user = await this.userModel.findOne({ email });
		return !user;
	}

	async update(id: string, updateDto: UpdateDto): Promise<UserDocument> {
		const { login, email, ...rest } = updateDto;

		if (login && !(await this.isLoginUnique(login))) {
			throw new BadRequestException('Логін зайнятий');
		}

		if (email && !(await this.isEmailUnique(email))) {
			throw new BadRequestException('Пошта вже використовується');
		}

		const user = await this.userModel.findByIdAndUpdate(
			id,
			{ login, email, ...rest },
			{ new: true }
		);

		if (!user) {
			throw new NotFoundException(`User with id ${id} not found`);
		}

		return user
	}

	async changePassword(id: string, changePasswordDto: ChangePasswordDto){
		const user = await this.userModel.findById(id);
		console.log(user)
		if (!user) {
			throw new NotFoundException(`User with id ${id} not found`);
		}

		const { oldPassword, newPassword } = changePasswordDto;

		if (user.passwordHash && !(await compare(oldPassword, user.passwordHash))) {
			throw new BadRequestException('Incorrect old password');
		}

		const salt = await genSalt(10);
		const passwordHash = await hash(newPassword, salt);
		user.passwordHash = passwordHash;
		return user.save();
	}

	async getSavedPublications(userId: string) {
		console.log(userId)
		const user = await this.userModel
			.findById(userId)
			.populate({
				path: 'saved',
				model: 'Publication',
			})
			.exec();
		if (!user) {
			throw new NotFoundException(`User with id ${userId} not found`);
		}
		return user.saved;
	}
}
