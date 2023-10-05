import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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
		required: true,
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
