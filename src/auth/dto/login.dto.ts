import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
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
}
