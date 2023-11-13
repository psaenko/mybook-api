import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleModel } from './role.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTConfig } from '../configs/jwt.config';

@Module({
	controllers: [RoleController],
	providers: [RoleService],
	imports: [MongooseModule.forFeature([
		{ name: Role.name, schema: RoleModel },
	]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig,
		}),
	],
	exports: [RoleService]
})
export class RoleModule {
}
