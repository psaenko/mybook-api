import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { PublicationController } from './publication/publication.controller';
import { BookPageController } from './book-page/book-page.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CityModule } from './city/city.module';
import { PublicationModule } from './publication/publication.module';
import { SchoolModule } from './school/school.module';
import { getMongoConfig } from './configs/mongo.config';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { CityController } from './city/city.controller';
import { SchoolController } from './school/school.controller';
import { UserController } from './user/user.controller';
import { JwtService } from '@nestjs/jwt';
import { RoleModule } from './role/role.module';
import { UserRoleModule } from './user-role/user-role.module';

@Module({
	imports: [ConfigModule.forRoot(),
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
		UserRoleModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
}
