import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsOptional } from 'class-validator';

export class CreateDto {
	@ApiProperty({
		example: 'Класи',
		required: true
	})
	@IsString()
	name: string;
}

export class UpdateDto {
	@ApiProperty({
		example: true,
		required: true
	})
	@IsBoolean()
	isShow: boolean;
}
