import { Controller, Get } from '@nestjs/common';
import { AvatarGeneratorService } from './avatar-generator.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Avatar generator')
@Controller('random-avatar')
export class AvatarGeneratorController {
  constructor(private readonly avatarService: AvatarGeneratorService) {}

  @Get()
  generate() {
    return this.avatarService.generateRandomAvatar();
  }
}
