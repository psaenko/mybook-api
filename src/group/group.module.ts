import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { PublicationController } from './group.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCategory, SubCategoryModel } from '../sub-category/sub-category.model';
import { Group, GroupModel } from './group.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTConfig } from '../configs/jwt.config';

@Module({
  providers: [GroupService],
  controllers: [PublicationController],
  imports: [MongooseModule.forFeature([
    { name: Group.name, schema: GroupModel },
    { name: SubCategory.name, schema: SubCategoryModel },
  ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
  ],
})
export class GroupModule {}
