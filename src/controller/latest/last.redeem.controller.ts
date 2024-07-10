import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { LastRedeemService } from 'src/service/latest/last.redeem.service';
import { format_json } from 'src/env';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Last redeem')
@Controller('api/users')
export class LastRedeemController {
  constructor(private readonly lastRedeemService: LastRedeemService) {}

  @Get('last-redeem')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'get' })
  @ApiResponse({ status: 200, description: 'Success' })
  async getLastRedeem(@Req() req: Request) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        return format_json(
          400,
          false,
          null,
          null,
          'Authorization header is missing',
          null,
        );
      }

      const token = authorizationHeader.split(' ')[1];

      if (!token) {
        return format_json(400,false, null, null, 'Bearer token is missing', null);
      }

      const getRedeemResult = await this.lastRedeemService.getLastRedeem(token);

      if (getRedeemResult.status) {
        return format_json(200,true, null, null, getRedeemResult.message, getRedeemResult.data);
      } else {
        return format_json(400,false, null, null, getRedeemResult.message, null);
      }
    } catch (error) {
      return format_json(400,false, true, null, 'Server Error '+error, error);
    }
  }
}
