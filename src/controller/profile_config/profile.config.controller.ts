import { Controller, Patch, Body, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { format_json } from 'src/env';
import { ProfileConfigurationService } from 'src/service/profile_config/profile.config.service';

@Controller('api/settings')
@UseGuards(AuthGuard('jwt'))
export class SettingsController {
  constructor(
    private readonly profileConfigService: ProfileConfigurationService,
  ) {}

  @Patch('location')
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
