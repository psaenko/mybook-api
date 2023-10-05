import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCategory, SubCategorySchema } from '../sub-category/sub-category.schema';
import { Publication, PublicationSchema } from './publication.schema';

@Module({
  providers: [PublicationService],
  controllers: [PublicationController],
  imports: [MongooseModule.forFeature([
    { name: Publication.name, schema: PublicationSchema },
    { name: SubCategory.name, schema: SubCategorySchema },
  ])],
})
export class PublicationModule {}
