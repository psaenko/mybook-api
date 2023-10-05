import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsOptional } from 'class-validator';

export class SubCategoryDto {
	@ApiProperty({
		example: '1 клас',
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

	@ApiProperty({
		example: '6512f25c770624afefed1293',
		required: true
	})
	@IsString()
	mainCategoryId: string;
}
