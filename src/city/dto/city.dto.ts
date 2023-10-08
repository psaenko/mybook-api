import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDto {
	@ApiProperty({
		example: 'Дніпро',
		required: true,
	})
	@IsString()
	name: string;
}

export class UpdateDto {
	@ApiProperty({
		example: false,
		required: true,
	})
	@IsString()
	isShow: boolean;
}
