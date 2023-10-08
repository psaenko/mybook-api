import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from './city.schema';
import { CityController } from './city.controller';
import { School, SchoolSchema } from '../school/school.schema';
import { UserModule } from '../user/user.module';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Module({
	providers: [CityService, JwtService, JwtAuthGuard],
	imports: [
		MongooseModule.forFeature([
			{ name: City.name, schema: CitySchema },
			{ name: School.name, schema: SchoolSchema },
		]),
		UserModule,
	],
	controllers: [CityController],
})
export class CityModule {
}
