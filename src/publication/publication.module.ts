import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCategory, SubCategoryModel } from '../sub-category/sub-category.model';
import { Publication, PublicationModel } from './publication.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTConfig } from '../configs/jwt.config';
import { Group, GroupModel } from '../group/group.model';
import { Category, CategoryModel } from '../category/category.model';

@Module({
  providers: [PublicationService],
  controllers: [PublicationController],
  imports: [MongooseModule.forFeature([
    { name: Publication.name, schema: PublicationModel },
    { name: SubCategory.name, schema: SubCategoryModel },
    { name: Group.name, schema: GroupModel },
    { name: Category.name, schema: CategoryModel },
  ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
  ],
})
export class PublicationModule {}
