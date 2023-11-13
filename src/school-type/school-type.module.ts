import { Module } from '@nestjs/common';
import { SchoolTypeService } from './school-type.service';
import { SchoolTypeController } from './school-type.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolType, SchoolTypeModel } from './school-type.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTConfig } from '../configs/jwt.config';

@Module({
	controllers: [SchoolTypeController],
	providers: [SchoolTypeService],
	imports: [MongooseModule.forFeature([
		{ name: SchoolType.name, schema: SchoolTypeModel },
	]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig,
		}),
	],
	exports: [SchoolTypeService, MongooseModule]
})
export class SchoolTypeModule {
}
