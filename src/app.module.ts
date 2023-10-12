import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CityModule } from './city/city.module';
import { SchoolModule } from './school/school.module';
import { getMongoConfig } from './configs/mongo.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { CategoryModule } from './category/category.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { PublicationModule } from './publication/publication.module';
import { AvatarGeneratorModule } from './avatar-generator/avatar-generator.module';
import { AuthorModule } from './author/author.module';
import { SchoolTypeModule } from './school-type/school-type.module';
import { GroupModule } from './group/group.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMongoConfig,
		}),
		CityModule,
		SchoolModule,
		AuthModule,
		UserModule,
		RoleModule,
		CategoryModule,
		SubCategoryModule,
		PublicationModule,
		AvatarGeneratorModule,
		AuthorModule,
		SchoolTypeModule,
		GroupModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
}
