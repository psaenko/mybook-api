import { Module } from '@nestjs/common';
import { AvatarGeneratorService } from './avatar-generator.service';
import { AvatarGeneratorController } from './avatar-generator.controller';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Module({
  controllers: [AvatarGeneratorController],
  providers: [AvatarGeneratorService, JwtService, JwtAuthGuard],
  exports: [AvatarGeneratorService]
})
export class AvatarGeneratorModule {}
