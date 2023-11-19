import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsOptional, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CreateSubCategoryDto {
	@ApiProperty({
		example: '1 клас',
		required: true
	})
	@IsString()
	name: string;

	@ApiProperty({
		example: '1',
		required: true
	})
	@IsOptional()
	@IsNumber()
	oldID: number;

	@ApiProperty({
		example: true,
		required: false
	})
	@IsOptional()
	@IsBoolean()
	isShow: boolean;

	@ApiProperty({
		example: 'qwqwfqwfwekjgnwefmdmqwjfw',
		required: true
	})
	@IsString()
	mainCategory: Types.ObjectId;
}
