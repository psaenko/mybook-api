import { Module } from '@nestjs/common';
import { PublicationService } from './publication.service';
import { PublicationController } from './publication.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCategory, SubCategorySchema } from '../sub-category/sub-category.schema';
import { Publication, PublicationSchema } from './publication.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJWTConfig } from '../configs/jwt.config';

@Module({
  providers: [PublicationService],
  controllers: [PublicationController],
  imports: [MongooseModule.forFeature([
    { name: Publication.name, schema: PublicationSchema },
    { name: SubCategory.name, schema: SubCategorySchema },
  ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
  ],
})
export class PublicationModule {}
