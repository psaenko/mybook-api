import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { PublicationController } from './group.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCategory, SubCategorySchema } from '../sub-category/sub-category.schema';
import { Group, GroupSchema } from './group.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTConfig } from '../configs/jwt.config';

@Module({
  providers: [GroupService],
  controllers: [PublicationController],
  imports: [MongooseModule.forFeature([
    { name: Group.name, schema: GroupSchema },
    { name: SubCategory.name, schema: SubCategorySchema },
  ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
  ],
})
export class GroupModule {}
