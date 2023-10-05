import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateSubCategoryDto {
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
	@IsBoolean()
	isShow: boolean;

	@ApiProperty({
		example: 'qwqwfqwfwekjgnwefmdmqwjfw',
		required: true
	})
	@IsBoolean()
	@IsString()
	mainCategoryId: Types.ObjectId;
}
