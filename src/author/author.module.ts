import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from './author.schema';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { getJWTConfig } from '../configs/jwt.config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig,
		}),
		UserModule
	],
	controllers: [AuthorController],
	providers: [AuthorService],
	exports: [AuthorService],
})
export class AuthorModule {
}
