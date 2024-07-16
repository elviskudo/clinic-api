import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  UploadedFile,
  UsePipes,
  Res,
  Get,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { AuthDTO } from 'src/dto/auth/auth.dto';
import { format_json } from 'src/env';
import { v2 as cloudinary } from 'cloudinary';
import path, { basename, extname } from 'path';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { CustomValidationPipe } from 'src/custom-validation.pipe';
import { AuthenticationService } from 'src/service/auth/authentication.service';
import { VerifikasiDTO } from 'src/dto/auth/verifikasi.dto';
import { AuthGuard } from '@nestjs/passport';
import { ProfileService } from 'src/service/auth/profile.service';
import { ProfileDto } from 'src/dto/auth/profile.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import { Updateavatar } from 'src/dto/auth/updateavatar.dto';
import { ChangePassDTO } from 'src/dto/auth/change.pass.dto';

export function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
  },
});

@ApiTags('Auth')
@Controller('api')
export class AuthController {
  constructor(
    private readonly AuthenticationService: AuthenticationService,
    private readonly profileService: ProfileService,
  ) {}

  @Post('auth/register')
  @UsePipes(CustomValidationPipe)
  @ApiOperation({ summary: 'Register' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 200 },
        success: { type: 'boolean', example: true },
        errors: { type: 'object', example: null },
        meta: { type: 'object', example: null },
        message: { type: 'string', example: 'Success' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '1f4b0c0e-f297-45a7-8854-fccd7fddc5c4' },
            email: { type: 'string', example: 'taztaz@gmail.com' },
            is_verified: { type: 'boolean', example: true },
            role: {
              type: 'object',
              properties: {
                id: { type: 'string', example: 'd789b7fd-b790-449b-b0cd-201294468ce2' },
                name: { type: 'string', example: 'admin' },
                description: { type: 'string', example: null }
              }
            },
            token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
          }
        }
      }
    }
  })
  async register(
    @Body() authDTO: AuthDTO,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const { fullname, email, phone_number, password } = authDTO;
      const user = await this.AuthenticationService.register(authDTO);
      if (user.status == true) {
        return res.status(200).json(
          format_json(200, true, false, null, 'User signed up successfully', user.users),
        );
      } else {
        return res
          .status(400)
          .json(format_json(400, false, true, user.errors, user.message, null));
      }
    } catch (error: any) {
      return res
        .status(400)
        .json(
          format_json(400, false, true, null, 'Server Error ', error.message),
        );
    }
  }

  @Post('auth/verification')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(CustomValidationPipe)
  @ApiOperation({ summary: 'Verifikasi akun' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 200 },
        success: { type: 'boolean', example: true },
        errors: { type: 'object', example: null },
        meta: { type: 'object', example: null },
        message: { type: 'string', example: 'Success' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '1f4b0c0e-f297-45a7-8854-fccd7fddc5c4' },
            email: { type: 'string', example: 'taztaz@gmail.com' },
            is_verified: { type: 'boolean', example: true },
            role: {
              type: 'object',
              properties: {
                id: { type: 'string', example: 'd789b7fd-b790-449b-b0cd-201294468ce2' },
                name: { type: 'string', example: 'admin' },
                description: { type: 'string', example: null }
              }
            },
            token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
          }
        }
      }
    }
  })
  async verifikasiEmail(
    @Body() verifikasiDTO: VerifikasiDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const { kode_otp } = verifikasiDTO;
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              null,
              null,
              'Authorization header is missing',
              null,
            ),
          );
      }

      const token = authorizationHeader.split(' ')[1];

      if (!token) {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              null,
              null,
              'Bearer token is missing',
              null,
            ),
          );
      }
      const verifikasiotp = await this.AuthenticationService.verifikasi(
        verifikasiDTO,
        token,
      );
      if (verifikasiotp.status == true) {
        return res.status(200).json(
          format_json(200, true, null, null, verifikasiotp.message, verifikasiotp.users),
        );
      } else {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              null,
              verifikasiotp.errors,
              verifikasiotp.message,
              null,
            ),
          );
      }
    } catch (error: any) {
      return res
        .status(400)
        .json(
          format_json(400, false, true, null, 'Server Error ', error.message),
        );
    }
  }

  @Get('auth/personal-data')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get personal data' })
  @ApiResponse({
    status: 200,
    description: 'Berhasil',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            status: { type: 'number', example: 200 },
            success: { type: 'boolean', example: true },
            errors: { type: 'string', example: null },
            meta: { type: 'object', example: null },
            message: { type: 'string', example: 'Berhasil' },
            data: {
              type: 'object',
              properties: {
                id: { type: 'string', example: '1f4b0c0e-f297-45a7-8854-fccd7fddc5c4' },
                email: { type: 'string', example: 'taztaz@gmail.com' },
                is_verified: { type: 'boolean', example: true },
                role: {
                  type: 'object',
                  properties: {
                    id: { type: 'string', example: 'd789b7fd-b790-449b-b0cd-201294468ce2' },
                    name: { type: 'string', example: 'admin' },
                    description: { type: 'string', example: null }
                  }
                },
                profile: {
                  type: 'object',
                  properties: {
                    id: { type: 'string', example: '9ee5144b-54aa-4941-8ba6-f46c11a1e35d' },
                    fullname: { type: 'string', example: 'Admin' },
                    phone_number: { type: 'string', example: '1234567894' },
                    profile_image: { type: 'string', example: 'https://api.dicebear.com/8.x/notionists/svg?seed=Admin' },
                    no_identity: { type: 'bigint', example: null },
                    birth_date: { type: 'date', example: null },
                    birth_place: { type: 'string', example: null },
                    address: { type: 'string', example: null },
                    gender: { type: 'string', example: null },
                    work_in: { type: 'string', example: null },
                    blood_type: { type: 'string', example: null },
                    marital_status: { type: 'string', example: null },
                    nationality: { type: 'string', example: null },
                    religion: { type: 'string', example: null },
                    user_id: { type: 'string', example: '1f4b0c0e-f297-45a7-8854-fccd7fddc5c4' },
                    city_id: { type: 'bigint', example: null },
                    neighborhood_no: { type: 'string', example: null },
                    citizen_no: { type: 'string', example: null },
                    area_code: { type: 'string', example: null },
                    responsibleForCosts: { type: 'string', example: null },
                    user: {
                      type: 'object',
                      properties: {
                        id: { type: 'string', example: '1f4b0c0e-f297-45a7-8854-fccd7fddc5c4' },
                        email: { type: 'string', example: 'taztaz@gmail.com' },
                        password: { type: 'string', example: '$2b$10$LVX3DrZTCX0g4B46F21qGull3Lxs.OL1vIE6cAHGGqPmbGl7EigpG' },
                        role_id: { type: 'string', example: 'd789b7fd-b790-449b-b0cd-201294468ce2' },
                        verifed: { type: 'number', example: 1 },
                        created_at: { type: 'string', example: '2024-07-11T05:54:23.483Z' },
                        updated_at: { type: 'string', example: '2024-07-11T05:54:23.483Z' }
                      }
                    }
                  }
                },
                token: { type: 'string', example: null }
              }
            }
          }
        }
      }
    }
  })
  async getpersonaldata(@Req() req: Request, @Res() res: Response) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              null,
              null,
              'Authorization header is missing',
              null,
            ),
          );
      }

      const token = authorizationHeader.split(' ')[1];

      if (!token) {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              null,
              null,
              'Bearer token is missing',
              null,
            ),
          );
      }
      const getprofile = await this.profileService.findprofile(token);
      if (getprofile.status == true) {
        return res
          .status(200)
          .json(
            format_json(
              200,
              true,
              null,
              null,
              getprofile.message,
              getprofile.users,
            ),
          );
      } else {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              getprofile.errors,
              null,
              getprofile.message,
              null,
            ),
          );
      }
    } catch (error: any) {
      return res
        .status(400)
        .json(
          format_json(400, false, true, null, 'Server Error ', error.message),
        );
    }
  }

  @Put('auth/personal-data')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(CustomValidationPipe)
  @ApiOperation({ summary: 'Update personal data' })
  @ApiResponse({
    status: 200,
    description: 'Berhasil',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            status: { type: 'number', example: 200 },
            success: { type: 'boolean', example: true },
            errors: { type: 'string', example: null },
            meta: { type: 'object', example: null },
            message: { type: 'string', example: 'Berhasil' },
            data: {
              type: 'object',
              properties: {
                id: { type: 'string', example: '1f4b0c0e-f297-45a7-8854-fccd7fddc5c4' },
                email: { type: 'string', example: 'taztaz@gmail.com' },
                is_verified: { type: 'boolean', example: true },
                role: {
                  type: 'object',
                  properties: {
                    id: { type: 'string', example: 'd789b7fd-b790-449b-b0cd-201294468ce2' },
                    name: { type: 'string', example: 'admin' },
                    description: { type: 'string', example: null }
                  }
                },
                profile: {
                  type: 'object',
                  properties: {
                    id: { type: 'string', example: '9ee5144b-54aa-4941-8ba6-f46c11a1e35d' },
                    fullname: { type: 'string', example: 'Admin' },
                    phone_number: { type: 'string', example: '1234567894' },
                    profile_image: { type: 'string', example: 'https://api.dicebear.com/8.x/notionists/svg?seed=Admin' },
                    no_identity: { type: 'bigint', example: null },
                    birth_date: { type: 'date', example: null },
                    birth_place: { type: 'string', example: null },
                    address: { type: 'string', example: null },
                    gender: { type: 'string', example: null },
                    work_in: { type: 'string', example: null },
                    blood_type: { type: 'string', example: null },
                    marital_status: { type: 'string', example: null },
                    nationality: { type: 'string', example: null },
                    religion: { type: 'string', example: null },
                    user_id: { type: 'string', example: '1f4b0c0e-f297-45a7-8854-fccd7fddc5c4' },
                    city_id: { type: 'bigint', example: null },
                    neighborhood_no: { type: 'string', example: null },
                    citizen_no: { type: 'string', example: null },
                    area_code: { type: 'string', example: null },
                    responsibleForCosts: { type: 'string', example: null },
                    user: {
                      type: 'object',
                      properties: {
                        id: { type: 'string', example: '1f4b0c0e-f297-45a7-8854-fccd7fddc5c4' },
                        email: { type: 'string', example: 'taztaz@gmail.com' },
                        password: { type: 'string', example: '$2b$10$LVX3DrZTCX0g4B46F21qGull3Lxs.OL1vIE6cAHGGqPmbGl7EigpG' },
                        role_id: { type: 'string', example: 'd789b7fd-b790-449b-b0cd-201294468ce2' },
                        verifed: { type: 'number', example: 1 },
                        created_at: { type: 'string', example: '2024-07-11T05:54:23.483Z' },
                        updated_at: { type: 'string', example: '2024-07-11T05:54:23.483Z' }
                      }
                    }
                  }
                },
                token: { type: 'string', example: null }
              }
            }
          }
        }
      }
    }
  })
  async updatepersonaldata(
    @Body() ProfileDTO: ProfileDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              null,
              null,
              'Authorization header is missing',
              null,
            ),
          );
      }

      const token = authorizationHeader.split(' ')[1];

      if (!token) {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              null,
              null,
              'Bearer token is missing',
              null,
            ),
          );
      }

      const dataprofile = {
        fullname: ProfileDTO.fullname,
        phone_number: ProfileDTO.phone_number,
        no_identity: ProfileDTO.no_identity,
        birth_date: ProfileDTO.birth_date,
        birth_place: ProfileDTO.birth_place,
        address: ProfileDTO.address,
        gender: ProfileDTO.gender,
        work_in: ProfileDTO.work_in,
        blood_type: ProfileDTO.blood_type,
        marital_status: ProfileDTO.marital_status,
        nationality: ProfileDTO.nationality,
        religion: ProfileDTO.religion,
        city_id: ProfileDTO.city_id,
        neighborhoodNo: ProfileDTO.neighborhoodNo,
        citizen_no: ProfileDTO.citizen_no,
        area_code: ProfileDTO.area_code,
        responsibleForCosts: ProfileDTO.responsibleForCosts,
      };

      const getprofile = await this.profileService.updatecreate(
        dataprofile,
        token,
      );
      if (getprofile.status == true) {
        return res
          .status(200)
          .json(
            format_json(
              200,
              true,
              null,
              null,
              getprofile.message,
              getprofile.users,
            ),
          );
      } else {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              getprofile.errors,
              null,
              getprofile.message,
              null,
            ),
          );
      }
    } catch (error: any) {
      return res
        .status(400)
        .json(
          format_json(400, false, true, null, 'Server Error ', error.message),
        );
    }
  }

  @Post('auth/signin')
  @ApiOperation({ summary: 'Sign in' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 200 },
        success: { type: 'boolean', example: true },
        errors: { type: 'object', example: null },
        meta: { type: 'object', example: null },
        message: { type: 'string', example: 'Success' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '1f4b0c0e-f297-45a7-8854-fccd7fddc5c4' },
            email: { type: 'string', example: 'taztaz@gmail.com' },
            is_verified: { type: 'boolean', example: true },
            role: {
              type: 'object',
              properties: {
                id: { type: 'string', example: 'd789b7fd-b790-449b-b0cd-201294468ce2' },
                name: { type: 'string', example: 'admin' },
                description: { type: 'string', example: null }
              }
            },
            token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
          }
        }
      }
    }
  })
  async signin(@Body() authDTO: AuthDTO, @Res() res: Response) {
    try {
      const user = await this.AuthenticationService.signin(authDTO);
      if (user.status) {
        return res.status(200).json(
          format_json(200, true, false, null, 'User signed in successfully', user.users),
        );
      } else {
        return res
          .status(400)
          .json(format_json(400, false, true, user.errors, user.message, null));
      }
    } catch (error: any) {
      return res
        .status(400)
        .json(
          format_json(400, false, true, null, 'Server Error ', error.message),
        );
    }
  }

  @Post('auth/signout')
  @ApiOperation({ summary: 'Sign out' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {
      type: 'object',
    }
  })
  async signout(@Req() req: Request, @Res() res: Response) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              null,
              null,
              'Authorization header is missing',
              null,
            ),
          );
      }

      const token = authorizationHeader.split(' ')[1];

      if (!token) {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              null,
              null,
              'Bearer token is missing',
              null,
            ),
          );
      }
      
      const user = await this.AuthenticationService.signout(token);
      if (user.status) {
        return res
          .status(200)
          .json(
            format_json(
              200,
              true,
              false,
              null,
              'User signed out successfully',
              null,
            ),
          );
      } else {
        return res
          .status(400)
          .json(format_json(400, false, true, user.errors, user.message, null));
      }
    } catch (error: any) {
      return res
        .status(400)
        .json(
          format_json(400, false, true, null, 'Server Error ', error.message),
        );
    }
  }

  @Post('auth/resend')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(CustomValidationPipe)
  @ApiOperation({ summary: 'Resend' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 200 },
        success: { type: 'boolean', example: true },
        errors: { type: 'object', example: null },
        meta: { type: 'object', example: null },
        message: { type: 'string', example: 'Success' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '1f4b0c0e-f297-45a7-8854-fccd7fddc5c4' },
            email: { type: 'string', example: 'taztaz@gmail.com' },
            is_verified: { type: 'boolean', example: true },
            role: {
              type: 'object',
              properties: {
                id: { type: 'string', example: 'd789b7fd-b790-449b-b0cd-201294468ce2' },
                name: { type: 'string', example: 'admin' },
                description: { type: 'string', example: null }
              }
            },
            token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
          }
        }
      }
    }
  })
  async resendOTP(@Req() req: Request, @Res() res: Response) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              null,
              null,
              'Authorization header is missing',
              null,
            ),
          );
      }

      const token = authorizationHeader.split(' ')[1];

      if (!token) {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              null,
              null,
              'Bearer token is missing',
              null,
            ),
          );
      }

      const resendotp = await this.AuthenticationService.resendotp(token);
      if (resendotp.status == true) {
        return res.status(200).json(
          format_json(200, true, null, null, resendotp.message, resendotp.users),
        );
      } else {
        return res
          .status(400)
          .json(format_json(400, false, null, null, resendotp.message, null));
      }
    } catch (error: any) {
      return res
        .status(400)
        .json(
          format_json(400, false, true, null, 'Server Error ', error.message),
        );
    }
  }

  @Put('users/update/avatar')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(CustomValidationPipe)
  @UseInterceptors(FileInterceptor('profil_image', { storage }))
  @ApiOperation({ summary: 'Update avatar' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 200 },
        success: { type: 'boolean', example: true },
        errors: { type: 'object', example: null },
        meta: { type: 'object', example: null },
        message: { type: 'string', example: 'Success' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '1f4b0c0e-f297-45a7-8854-fccd7fddc5c4' },
            email: { type: 'string', example: 'taztaz@gmail.com' },
            is_verified: { type: 'boolean', example: true },
            role: {
              type: 'object',
              properties: {
                id: { type: 'string', example: 'd789b7fd-b790-449b-b0cd-201294468ce2' },
                name: { type: 'string', example: 'admin' },
                description: { type: 'string', example: null }
              }
            },
            token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
          }
        }
      }
    }
  })
  async update_avatar(
    @Req() req: Request,
    @UploadedFile() profil_image: Express.Multer.File,
    @Res() res: Response,
  ) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              null,
              null,
              'Authorization header is missing',
              null,
            ),
          );
      }

      const token = authorizationHeader.split(' ')[1];

      if (!token) {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              null,
              null,
              'Bearer token is missing',
              null,
            ),
          );
      }

      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      try {
        const get_name_file = basename(
          profil_image.filename,
          extname(profil_image.filename),
        );
        const uploadResult = await cloudinary.uploader.upload(
          profil_image.path,
          { public_id: get_name_file },
        );
        var get_url_profile = uploadResult.secure_url;

        const filePath = profil_image.path;
        fs.unlinkSync(path.resolve(filePath));
        
      } catch (error) {
        console.error(error);
        console.error(profil_image);
        console.error(profil_image.path);
        const publicId = uuidv4().replace(/-/g, '');
        get_url_profile =
          'https://api.dicebear.com/8.x/adventurer/svg?seed=' + publicId;
      }

      const updateProfile = this.profileService.update_avatar(
        token,
        get_url_profile,
      );

      if ((await updateProfile).status == true) {
        return res.status(200).json(
          format_json(200, true, null, null, (await updateProfile).message, (await updateProfile).users),
        );
      } else {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              null,
              null,
              (await updateProfile).message,
              null,
            ),
          );
      }
    } catch (error: any) {
      return res
        .status(400)
        .json(
          format_json(400, false, true, null, 'Server Error ', error.message),
        );
    }
  }

  @Post('users/change-password')
  @UsePipes(CustomValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'number', example: 200 },
        success: { type: 'boolean', example: true },
        errors: { type: 'object', example: null },
        meta: { type: 'object', example: null },
        message: { type: 'string', example: 'Success' },
        data: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '1f4b0c0e-f297-45a7-8854-fccd7fddc5c4' },
            email: { type: 'string', example: 'taztaz@gmail.com' },
            is_verified: { type: 'boolean', example: true },
            role: {
              type: 'object',
              properties: {
                id: { type: 'string', example: 'd789b7fd-b790-449b-b0cd-201294468ce2' },
                name: { type: 'string', example: 'admin' },
                description: { type: 'string', example: null }
              }
            },
            token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }
          }
        }
      }
    }
  })
  async change_password(
    @Body() ChangePassDTO: ChangePassDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const authorizationHeader = req.headers['authorization'];

      if (!authorizationHeader) {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              null,
              null,
              'Authorization header is missing',
              null,
            ),
          );
      }

      const token = authorizationHeader.split(' ')[1];

      if (!token) {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              null,
              null,
              'Bearer token is missing',
              null,
            ),
          );
      }

      const { password, confirmPassword } = ChangePassDTO;

      const change_password = this.AuthenticationService.change_pass(token, password);

      if ((await change_password).status === true) {
        return res.status(200).json(
          format_json(200, true, null, null, (await change_password).message, (await change_password).users),
        );
      } else {
        return res
          .status(400)
          .json(
            format_json(
              400,
              false,
              null,
              (await change_password).errors,
              (await change_password).message,
              null,
            ),
          );
      }
    } catch (error: any) {
      return res
        .status(400)
        .json(
          format_json(400, false, true, null, 'Server Error ', error.message),
        );
    }
  }
}
