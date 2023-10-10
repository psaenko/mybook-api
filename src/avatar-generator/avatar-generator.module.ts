import { Module } from '@nestjs/common';
import { AvatarGeneratorService } from './avatar-generator.service';
import { AvatarGeneratorController } from './avatar-generator.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AvatarGeneratorController],
  providers: [AvatarGeneratorService],
  exports: [AvatarGeneratorService]
})
export class AvatarGeneratorModule {}
