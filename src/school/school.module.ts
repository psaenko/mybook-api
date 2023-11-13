// school.module.ts
import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { MongooseModule } from '@nestjs/mongoose';
import { School, SchoolModel } from './school.model';
import { SchoolController } from './school.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTConfig } from '../configs/jwt.config';
import { SchoolTypeModule } from '../school-type/school-type.module';

@Module({
	providers: [SchoolService],
	imports: [
		SchoolTypeModule,
		MongooseModule.forFeature([
			{ name: School.name, schema: SchoolModel },
		]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig,
		}),
	],
	controllers: [SchoolController],
})
export class SchoolModule {}
