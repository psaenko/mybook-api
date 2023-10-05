import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsOptional, IsNumber, IsArray } from 'class-validator';

export class PublicationDto {
	@ApiProperty({
		example: 'Буквар для 1 класу',
		required: true
	})
	@IsString()
	title: string;

	@ApiProperty({
		example: 'М. Коцюбинський',
		required: true
	})
	author: string[];

	@ApiProperty({
		example: '2023',
		required: true
	})
	@IsNumber()
	year: number;

	@ApiProperty({
		example: 'Підручник з різноманітними зображеннями...',
		required: false
	})
	@IsString()
	@IsOptional()
	description: string;

	@ApiProperty({
		example: '6512f25c770624afefed1293',
		required: true
	})
	@IsString()
	category: string;

	@ApiProperty({
		example: '50ae6e912305042e48e0822f7a32e36fa873a976b23a85ff7ec9c4f5e0dbc9eb',
		required: true
	})
	@IsString()
	mainImage: string;

	@ApiProperty({
		example: '50ae6e912305042e48e0822f7a32e36fa873a976b23a85ff7ec9c4f5e0dbc9eb',
		required: true
	})
	@IsString()
	mainFile: string;

	@ApiProperty({
		example: ['50ae6e912305042e48e0822f7a32e36fa873a976b23a85ff7ec9c4fkuy26d09j', '50ae6e912305042e48e0822f7a32e36fa873a976b23a85ff7ec9cp75nd8h615'],
		required: false
	})
	@IsArray()
	@IsOptional()
	files: string[];

	@ApiProperty({
		example: true,
		default: false,
		required: true
	})
	@IsBoolean()
	@IsOptional()
	isShow: boolean;
}
