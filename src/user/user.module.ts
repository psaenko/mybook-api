import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserModel } from './user.model';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTConfig } from '../configs/jwt.config';
import { RoleModule } from '../role/role.module';
import { AvatarGeneratorModule } from '../avatar-generator/avatar-generator.module';

@Module({
	controllers: [UserController],
	imports: [
		MongooseModule.forFeature(
		[{ name: User.name, schema: UserModel }]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig,
		}),
		RoleModule,
		AvatarGeneratorModule,
	],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {
}
