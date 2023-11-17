import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDto {
	@ApiProperty({
		example: 'Макарчук В.П.',
		required: true,
	})
	@IsString()
	name: string;
}

export class UpdateDto {
	@ApiProperty({
		example: false,
		required: false,
	})
	@IsString()
	isShow: boolean;
}
