import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsOptional, IsNumber, IsArray } from 'class-validator';

export class GroupDto {
	@ApiProperty({
		example: 'Шкільні підрубчники',
		required: true
	})
	@IsString()
	name: string;

	@ApiProperty({
		example: 'lucide:school',
		required: false
	})
	@IsString()
	icon: string;

	@ApiProperty({
		example: '50ae6e912305042e48e0822f7a32e36fa873a976b23a85ff7ec9c4f5e0dbc9eb',
		required: true
	})
	categories: string[];

	@ApiProperty({
		example: [true, false],
		default: false,
		required: false
	})
	@IsBoolean()
	@IsOptional()
	isShow: boolean;
}
