import { Controller, Get, UseGuards } from '@nestjs/common';
import { AvatarGeneratorService } from './avatar-generator.service';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles-auth.decorator';

@ApiTags('Avatar generator')
@Controller('random-avatar')
export class AvatarGeneratorController {
  constructor(private readonly avatarService: AvatarGeneratorService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Generate random avatar' })
  @ApiResponse({ status: 200, description: 'Returns random avatar url.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiQuery({ name: 'isShow', type: Boolean, required: true, example: [true, false] })
  @ApiParam({ name: 'page', required: true, type: Number, example: 1 })
  @Roles('ALL USERS')
  @Get()
  generate() {
    return this.avatarService.generateRandomAvatar();
  }
}
