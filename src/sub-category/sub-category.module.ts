import { Module } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { SubCategoryController } from './sub-category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from '../category/category.schema';
import { SubCategory, SubCategorySchema } from './sub-category.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTConfig } from '../configs/jwt.config';

@Module({
  controllers: [SubCategoryController],
  providers: [SubCategoryService],
  imports: [MongooseModule.forFeature([
    { name: SubCategory.name, schema: SubCategorySchema },
    { name: Category.name, schema: CategorySchema },
  ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
  ],
})
export class SubCategoryModule {}
