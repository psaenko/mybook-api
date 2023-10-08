import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from './author.schema';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { getJWTConfig } from '../configs/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }])],
	controllers: [AuthorController],
	providers: [AuthorService, JwtService, JwtAuthGuard],
	exports: [AuthorService],
})
export class AuthorModule {
}
