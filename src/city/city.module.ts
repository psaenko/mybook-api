import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from './city.schema';
import { CityController } from './city.controller';
import { School, SchoolSchema } from '../school/school.schema';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTConfig } from '../configs/jwt.config';

@Module({
	providers: [CityService],
	imports: [
		MongooseModule.forFeature([
			{ name: City.name, schema: CitySchema },
			{ name: School.name, schema: SchoolSchema },
		]),
		UserModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig,
		}),
	],
	controllers: [CityController],
})
export class CityModule {
}
