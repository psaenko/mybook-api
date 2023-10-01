import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { MongooseModule } from '@nestjs/mongoose';
import { School, SchoolSchema } from './school.model';
import { City, CitySchema } from '../city/city.model';
import { SchoolController } from './school.controller';

@Module({
	providers: [SchoolService],
	imports: [MongooseModule.forFeature([
		{ name: School.name, schema: SchoolSchema },
	])],
	controllers: [SchoolController],
})
export class SchoolModule {

}
