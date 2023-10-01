import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from './city.model';
import { CityController } from './city.controller';
import { School, SchoolSchema } from '../school/school.model';

@Module({
	providers: [CityService],
	imports: [MongooseModule.forFeature([
		{ name: City.name, schema: CitySchema },
		{ name: School.name, schema: SchoolSchema },
	])],
	controllers: [CityController],
})
export class CityModule {
}
