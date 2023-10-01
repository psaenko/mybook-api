import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
	@ApiProperty({
		example: 'Саєнко Павло Сергійович',
		required: true
	})
	fullName: string;

	@ApiProperty({
		example: 'psaienko',
		required: true
	})
	login: string;

	@ApiProperty({
		example: 'qwerty123',
		required: true
	})
	password: string;

	@ApiProperty({
		example: '6512f25c770624afefed1293',
		required: true
	})
	city: string;
	@ApiProperty({
		example: 'Admin',
		required: false,
		default: 'User'
	})
	role: string;
}
