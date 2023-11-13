import { Module } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { SubCategoryController } from './sub-category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategoryModel } from '../category/category.model';
import { SubCategory, SubCategoryModel } from './sub-category.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTConfig } from '../configs/jwt.config';

@Module({
  controllers: [SubCategoryController],
  providers: [SubCategoryService],
  imports: [MongooseModule.forFeature([
    { name: SubCategory.name, schema: SubCategoryModel },
    { name: Category.name, schema: CategoryModel },
  ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
  ],
})
export class SubCategoryModule {}
