import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsOptional } from 'class-validator';

export class CategoryDto {
	@ApiProperty({
		example: 'Класи',
		required: true
	})
	@IsString()
	name: string;

	@ApiProperty({
		example: true,
		required: true
	})
	@IsBoolean()
	@IsOptional()
	isShow: boolean;
}
