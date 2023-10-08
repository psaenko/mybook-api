import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTConfig } from '../configs/jwt.config';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { RoleModule } from '../role/role.module';
import { GoogleStrategy } from '../strategies/google.strategy';
import { AvatarGeneratorModule } from '../avatar-generator/avatar-generator.module';

@Module({
	providers: [AuthService, GoogleStrategy],
	controllers: [AuthController],
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig,
		}),
		ConfigModule,
		UserModule,
		PassportModule,
		RoleModule,
		AvatarGeneratorModule
	],
})
export class AuthModule {
}
