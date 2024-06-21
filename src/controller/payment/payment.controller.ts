import { Controller, Get, Post, Put, Delete, Req, UseGuards, Res, Body, Param} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { format_json } from 'src/env';
import { Response } from 'express';
import { PaymentService } from 'src/service/payment/payment.service';
import { paymentDTO } from 'src/dto/payment/payment.dto';

@Controller('api/users')
export class paymentController {
  constructor(private readonly PaymentService: PaymentService) {}

  @Get('payment')
  @UseGuards(AuthGuard('jwt'))
  async getpayment(@Req() req: Request,@Res() res: Response) {
    try {
        const authorizationHeader = req.headers['authorization'];
  
        if (!authorizationHeader) {
          return res.status(400).json(format_json(
            400,
            false,
            null,
            null,
            'Authorization header is missing',
            null,
          ));
        }
  
        const token = authorizationHeader.split(' ')[1];
  
        if (!token) {
          return res.status(400).json(format_json(
            400,
            false,
            null,
            null,
            'Bearer token is missing',
            null,
          ));
        }

        const getdata = await this.PaymentService.getdata(token);

        if (getdata.status) {
            return res.status(200).json(format_json(200,true, null, null, getdata.message, getdata.data));
        } else {
            return res.status(400).json(format_json(400,false, null, null, getdata.message, null));
        }

      } catch (error) {
        return res.status(400).json(format_json(400, false, true, null, 'Server Error', error.message));
      }
    }

  @Post('payment')
  @UseGuards(AuthGuard('jwt'))
  async createpayment(@Body() createDTO: paymentDTO,@Req() req: Request,@Res() res: Response) {
    try {
        const authorizationHeader = req.headers['authorization'];
  
        if (!authorizationHeader) {
          return res.status(400).json(format_json(
            400,
            false,
            null,
            null,
            'Authorization header is missing',
            null,
          ));
        }
  
        const token = authorizationHeader.split(' ')[1];
  
        if (!token) {
          return res.status(400).json(format_json(
            400,
            false,
            null,
            null,
            'Bearer token is missing',
            null,
          ));
        }

        const { payment_name, redeem_id, bank_id } = createDTO;
        const create = await this.PaymentService.createpayment(token, createDTO);

        if (create.status) {
            return res.status(200).json(format_json(200,true, null, null, create.message, create.data));
        } else {
            return res.status(400).json(format_json(400,false, null, null, create.message, null));
        }

      } catch (error) {
        return res.status(400).json(format_json(400, false, true, null, 'Server Error', error));
      }
    }

    @Put('payment/:id')
    @UseGuards(AuthGuard('jwt'))
    async Updatepayment(@Param('id') id: number,@Body() createDTO: paymentDTO,@Req() req: Request,@Res() res: Response) {
      try {
          const authorizationHeader = req.headers['authorization'];
    
          if (!authorizationHeader) {
            return res.status(400).json(format_json(
              400,
              false,
              null,
              null,
              'Authorization header is missing',
              null,
            ));
          }
    
          const token = authorizationHeader.split(' ')[1];
    
          if (!token) {
            return res.status(400).json(format_json(
              400,
              false,
              null,
              null,
              'Bearer token is missing',
              null,
            ));
          }
  
          const { payment_name, redeem_id, bank_id } = createDTO;
          const update = await this.PaymentService.update(token, createDTO, id);
  
          if (update.status) {
              return res.status(200).json(format_json(200,true, null, null, update.message, update.data));
          } else {
              return res.status(400).json(format_json(400,false, null, null, update.message, null));
          }
  
        } catch (error) {
          return res.status(400).json(format_json(400, false, true, null, 'Server Error', error));
        }
      }

      
    @Delete('payment/:id')
    @UseGuards(AuthGuard('jwt'))
    async deletepayment(@Param('id') id: number,@Req() req: Request,@Res() res: Response) {
      try {
          const authorizationHeader = req.headers['authorization'];
    
          if (!authorizationHeader) {
            return res.status(400).json(format_json(
              400,
              false,
              null,
              null,
              'Authorization header is missing',
              null,
            ));
          }
    
          const token = authorizationHeader.split(' ')[1];
    
          if (!token) {
            return res.status(400).json(format_json(
              400,
              false,
              null,
              null,
              'Bearer token is missing',
              null,
            ));
          }

          const deletedata = await this.PaymentService.delete(token,id);
  
          if (deletedata.status) {
              return res.status(200).json(format_json(200,true, null, null, deletedata.message, deletedata.data));
          } else {
              return res.status(400).json(format_json(400,false, null, null, deletedata.message, null));
          }
  
        } catch (error) {
          return res.status(400).json(format_json(400, false, true, null, 'Server Error', error));
        }
      }
}
