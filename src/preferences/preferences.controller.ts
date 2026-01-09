import { Controller, Get, Put, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse as ApiResponseSwagger,
  ApiBody,
} from '@nestjs/swagger';
import { PreferencesService } from './preferences.service';
import { UpdatePreferencesDto } from './dto';

@ApiTags('preferences')
@Controller('preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @Get()
  @ApiOperation({
    summary: 'Lấy thông tin sở thích',
    description: 'Lấy thông tin sở thích người dùng hiện tại',
  })
  @ApiResponseSwagger({ status: 200, description: 'Thông tin sở thích' })
  async getPreferences() {
    const preferences = await this.preferencesService.getPreferences();
    return { preferences };
  }

  @Put()
  @ApiOperation({
    summary: 'Cập nhật thông tin sở thích',
    description: 'Cập nhật thông tin sở thích người dùng',
  })
  @ApiBody({
    type: UpdatePreferencesDto,
    description: 'Thông tin sở thích cần cập nhật',
  })
  @ApiResponseSwagger({ status: 200, description: 'Sở thích được cập nhật' })
  async updatePreferences(@Body() updatePreferencesDto: UpdatePreferencesDto) {
    const preferences =
      await this.preferencesService.updatePreferences(updatePreferencesDto);
    return { preferences };
  }
}
