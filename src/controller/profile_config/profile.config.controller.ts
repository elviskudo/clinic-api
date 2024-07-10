import { Controller, Patch, Body, Req, UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomValidationPipe } from 'src/custom-validation.pipe';
import { format_json } from 'src/env';
import { ProfileConfigurationService } from 'src/service/profile_config/profile.config.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/middleware/role.guard';

@ApiTags('Profile configuration')
@Controller('api/settings')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class SettingsController {
  constructor(
    private readonly profileConfigService: ProfileConfigurationService,
  ) {}

  @Patch('location')
  @UsePipes(CustomValidationPipe)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({ summary: 'location update' })
  @ApiResponse({ status: 200, description: 'Success' })
  async updateLocationSetting(
    @Body('isLocation') isLocation: boolean,
    @Req() req,
  ) {
    const userId = req.user.id;
    const updatedConfig = await this.profileConfigService.update(userId, {
      isLocation,
    });
    return format_json(
      200,
      true,
      null,
      null,
      'Location setting updated successfully',
      updatedConfig,
    );
  }

  @Patch('push-notification')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({ summary: 'notification update' })
  @ApiResponse({ status: 200, description: 'Success' })
  async updatePushNotificationSetting(
    @Body('isPushNotification') isPushNotification: boolean,
    @Req() req,
  ) {
    const userId = req.user.id;
    const updatedConfig = await this.profileConfigService.update(userId, {
      isPushNotification,
    });
    return format_json(
      200,
      true,
      null,
      null,
      'Push notification setting updated successfully',
      updatedConfig,
    );
  }

  @Patch('email-notification')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({ summary: 'email notification update' })
  @ApiResponse({ status: 200, description: 'Success' })
  async updateEmailNotificationSetting(
    @Body('isEmailNotification') isEmailNotification: boolean,
    @Req() req,
  ) {
    const userId = req.user.id;
    const updatedConfig = await this.profileConfigService.update(userId, {
      isEmailNotification,
    });
    return format_json(
      200,
      true,
      null,
      null,
      'Email notification setting updated successfully',
      updatedConfig,
    );
  }
}
