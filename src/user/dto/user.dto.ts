import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateDto {
	@ApiProperty({
		example: 'Саєнко Павло Сергійович',
		required: true,
	})
	fullName: string;

	@ApiProperty({
		example: 'psaienko',
		required: true,
	})
	login: string;

	@ApiProperty({
		example: 'qwerty123',
		required: false,
	})
	password: string;

	@ApiProperty({
		example: '6512f25c770624afefed1293',
		required: true,
	})
	city: string;
	@ApiProperty({
		example: '6519a12cc60f1fcd95aa9aa2',
		required: false,
		default: '6519a12cc60f1fcd95aa9aa2',
	})
	role: string;
}

export class UpdateDto {
	@IsOptional()
	@IsString()
	fullName?: string;

	@IsOptional()
	@IsString()
	login?: string;

	@IsOptional()
	@IsString()
	email?: string;

	@IsOptional()
	@IsString()
	city?: Types.ObjectId;

	@IsOptional()
	@IsString()
	school?: Types.ObjectId;

	@IsOptional()
	@IsString()
	avatar?: string;

	@IsOptional()
	@IsDate()
	birthdayDate?: Date;
}

export class ChangePasswordDto {

	@IsOptional()
	@IsString()
	oldPassword?: string;

	@IsString()
	newPassword: string;
}
