import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

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
	@ApiProperty({
		example: 'Саєнко Павло Сергійович',
		required: true,
	})
	@IsOptional()
	fullName: string;

	@ApiProperty({
		example: '6512f25c770624afefed1293',
		required: true,
	})
	@IsOptional()
	city: string;

	@ApiProperty({
		example: '6519a12cc60f1fcd95aa9aa2',
		required: false,
		default: '6519a12cc60f1fcd95aa9aa2',
	})
	@IsOptional()
	role: string;

	@ApiProperty({
		example: '6519a12cc60f1fcd95aa9aa2',
		required: false,
		default: '6519a12cc60f1fcd95aa9aa2',
	})
	@IsOptional()
	school: string;

	@ApiProperty({
		example: '6519a12cc60f1fcd95aa9aa2',
		required: false,
		default: '6519a12cc60f1fcd95aa9aa2',
	})
	@IsOptional()
	class: string;

	@ApiProperty({
		example: '6519a12cc60f1fcd95aa9aa2',
		required: false,
		default: '6519a12cc60f1fcd95aa9aa2',
	})
	@IsOptional()
	avatar: string;
}
