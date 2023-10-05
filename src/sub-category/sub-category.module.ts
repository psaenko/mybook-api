import { Module } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { SubCategoryController } from './sub-category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from '../category/category.schema';
import { SubCategory, SubCategorySchema } from './sub-category.schema';

@Module({
  controllers: [SubCategoryController],
  providers: [SubCategoryService],
  imports: [MongooseModule.forFeature([
    { name: SubCategory.name, schema: SubCategorySchema },
    { name: Category.name, schema: CategorySchema },
  ])],
})
export class SubCategoryModule {}
