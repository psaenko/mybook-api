import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.model';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { compare, genSalt, hash } from 'bcrypt';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from '../auth/auth.constants';

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
	}

	async createUser(dto: CreateUserDto) {
		const salt = await genSalt(10);
		const newUser = await new this.userModel({ passwordHash: await hash(dto.password, salt), ...dto });
		const user = newUser.save();
		return user
	}

	async findUser(login: string) {
		return this.userModel.findOne({ login }).exec();
	}
	async findUserMail(mail: string) {
		return this.userModel.findOne({ mail }).exec();
	}

	async validateUser(login: string,password: string) {
		let user = await this.findUser(login);
		if (!user) {
			throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
		}

		const isCorrectPassword = await compare(password, user.passwordHash);
		if (!isCorrectPassword) {
			throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
		}

		return { user: user };

	}
}
