import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './category.schema';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, JwtService, JwtAuthGuard],
  imports: [MongooseModule.forFeature([
    { name: Category.name, schema: CategorySchema },
  ])],
})
export class CategoryModule {}
