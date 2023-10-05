import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDto {
	@ApiProperty({
		example: 'Макарчук В.П.',
		required: true,
	})
	@IsString()
	name: string;
}
