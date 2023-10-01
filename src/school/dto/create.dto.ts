import { Schema } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSchoolDto {
	@ApiProperty({
		example: 'КЗО "СЗШ №96" ДМР',
		required: true
	})
	@IsString()
	name: string;
	@ApiProperty({
		example: 'School',
		required: true
	})
	@IsString()
	type: string;
	@ApiProperty({
		example: '6512f25c770624afefed1293',
		required: true
	})
	@IsString()
	city: string;
}
