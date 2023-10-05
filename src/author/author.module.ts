import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Author, AuthorSchema } from './author.schema';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';

@Module({
	imports: [MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }])],
	controllers: [AuthorController],
	providers: [AuthorService],
	exports: [AuthorService],
})
export class AuthorModule {
}
