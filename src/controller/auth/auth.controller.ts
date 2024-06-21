import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  UploadedFile,
  Get,
  Put,
  Res,
  HttpStatus
} from '@nestjs/common';
import { AuthDTO } from 'src/dto/auth/auth.dto';
import { SignInDto } from 'src/dto/auth/signin.dto';
import { VerifikasiDTO } from 'src/dto/auth/verifikasi.dto';
import { format_json } from 'src/env';
import { AuthService } from 'src/service/auth/auth.service';
import { mailService } from 'src/service/mailer/mailer.service';
import { AuthGuard } from '@nestjs/passport';
import { ProfileDto } from 'src/dto/auth/profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { v4 as uuidv4 } from 'uuid';
import { ChangePassDTO } from 'src/dto/auth/change.pass.dto';
import { v2 as cloudinary } from 'cloudinary';
import path, { basename, extname } from 'path';
import { diskStorage } from 'multer';
import { GoogleOauthGuard } from 'src/middleware/google.auth.guards';
import { Response } from 'express';


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

@Controller('api')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: mailService,
  ) {}

  @Post('auth/register')
  async register(@Body() authDTO: AuthDTO,@Res() res: Response) {
    try {
      const { fullname, email, phone_number, password } = authDTO;
      const user = await this.authService.register(
        fullname,
        email,
        phone_number,
        password,
      );
      if (user.status == true) {
        const code = generateRandomNumber(100000, 999999);
        const checkotp = this.authService.checkotp(code);
        let otp;
        if (checkotp) {
          otp = code;
        } else {
          otp = generateRandomNumber(100000, 999999);
        }
        const sendemail = this.mailService.sendMail(
          email,
          'Verifikasi email',
          otp,
          fullname,
        );
        const saveotp = await this.authService.saveOtp(otp, user.users.id, 0);
        return res.status(200).json(format_json(
          200,
          true,
          false,
          null,
          'User signed up successfully',
          {
            user: user.users,
            token: user.token
          },
        ));
      } else {
        return res.status(400).json(format_json(400, false, true, null, user.message, null));
      }
    } catch (error) {
      return res.status(400).json(format_json(400, false, true, null, 'Server Error', error));
    }
  }

  @Post('auth/signin')
  async signIn(@Body() signInDto: SignInDto,@Res() res: Response) {
    const { email, password } = signInDto;
    const token = await this.authService.signIn(email, password);

    if (token.status) {
      if (token.users.verifikasi == true) {
        return res.status(200).json(format_json(
          200,
          true,
          false,
          null,
          'User signed in successfully',
          {
            user : token.users,
            token: token.token
          },
        ));
      } else {
        const code = generateRandomNumber(100000, 999999);
        const checkotp = this.authService.checkotp(code);
        let otp;
        if (checkotp) {
          otp = code;
        } else {
          otp = generateRandomNumber(100000, 999999);
        }
        const sendemail = this.mailService.sendMail(
          email,
          'Verifikasi email',
          otp,
          token.users.email,
        );
        const saveotp = await this.authService.saveOtp(otp, token.users.id, 0);
        return res.status(200).json(format_json(
          200,
          true,
          false,
          null,
          'Silakan verifikasi email anda',
          {
            user : token.users,
            token: token.token
          },
        ));
      }
    } else {
      return res.status(400).json(format_json(400, false, null, null, token.message, null));
    }
  }

  @Post('auth/verification')
  @UseGuards(AuthGuard('jwt'))
  async verifikasiEmail(
    @Body() verifikasiDTO: VerifikasiDTO,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const { kode_otp } = verifikasiDTO;
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
      const verifikasiotp = await this.authService.verifikasi(kode_otp, token);
      if (verifikasiotp.status == true) {
        return res.status(200).json(format_json(200, true, null, null, verifikasiotp.message, {
          user: verifikasiotp.users,
          token: verifikasiotp.token
        }));
      } else {
        return res.status(400).json(format_json(400, false, null, null, verifikasiotp.message, null));
      }
    } catch (error) {
      return res.status(400).json(format_json(400, false, true, null, 'Server Error', error));
    }
  }

  @Post('auth/resend')
  @UseGuards(AuthGuard('jwt'))
  async resendOTP(@Req() req: Request,@Res() res: Response) {
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

      const code = generateRandomNumber(100000, 999999);
      const checkotp = this.authService.checkotp(code);
      let otp;
      if (checkotp) {
        otp = code;
      } else {
        otp = generateRandomNumber(100000, 999999);
      }

      const resendotp = await this.authService.resendotp(token, otp);
      if (resendotp.status == true) {
        return res.status(200).json(format_json(200, true, null, null, resendotp.message, {
          user: resendotp.users,
          token: resendotp.token
        }));
      } else {
        return res.status(400).json(format_json(400, false, null, null, resendotp.message, null));
      }
    } catch (error) {
      return res.status(400).json(format_json(400, false, true, null, 'Server Error', error));
    }
  }

  @Get('users/profiles')
  @UseGuards(AuthGuard('jwt'))
  async get_profile(@Req() req: Request,@Res() res: Response) {
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

      const getprofile = this.authService.profile(token);

      if ((await getprofile).status === true) {
        return res.status(200).json(format_json(200, true, null, null, (await getprofile).message, {
          user: (await getprofile).users,
          token: (await getprofile).token
        }));
      } else {
        return res.status(400).json(format_json(
          400,
          false,
          null,
          null,
          (await getprofile).message,
          null,
        ));
      }
    } catch (error) {
      return res.status(400).json(format_json(400, false, true, null, 'Server Error', error));
    }
  }

  @Get('users/personal-data')
  @UseGuards(AuthGuard('jwt'))
  async get_personaldata(@Req() req: Request,@Res() res: Response) {
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

      const getpersonaldata = this.authService.personal_data(token);

      if ((await getpersonaldata).status === true) {
        return res.status(200).json(format_json(200, true, null, null, (await getpersonaldata).message, {
          user: (await getpersonaldata).users,
          token: (await getpersonaldata).token
        }));
      } else {
        return res.status(400).json(format_json(
          400,
          false,
          null,
          null,
          (await getpersonaldata).message,
          null,
        ));
      }
    } catch (error) {
      return res.status(400).json(format_json(400, false, true, null, 'Server Error', error));
    }
  }

  @Put('users/update/avatar')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('profil_image', { storage }))
  async update_avatar(
    @Req() req: Request,
    @UploadedFile() profil_image: Express.Multer.File,
    @Res() res: Response
  ) {
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
      } catch (error) {
        console.error(error);
        console.error(profil_image);
        console.error(profil_image.path);
        const publicId = uuidv4().replace(/-/g, '');
        get_url_profile =
          'https://api.dicebear.com/8.x/adventurer/svg?seed=' + publicId;
      }

      const updateProfile = this.authService.update_avatar(
        token,
        get_url_profile,
      );

      if ((await updateProfile).status == true) {
        return res.status(200).json(format_json(
          200,
          true,
          null,
          null,
          (await updateProfile).message,
          {
            user: (await updateProfile).users,
            token: (await updateProfile).token
          },
        ));
      } else {
        return res.status(400).json(format_json(
          400,
          false,
          null,
          null,
          (await updateProfile).message,
          null,
        ));
      }
    } catch (error) {
      return res.status(400).json(format_json(400, false, true, null, 'Server Error', error));
    }
  }

  @Put('users/personal-data')
  @UseGuards(AuthGuard('jwt'))
  async update_profile(@Body() profileDTO: ProfileDto, @Req() req: Request,@Res() res: Response) {
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

      const profile = {
        fullname: profileDTO.fullname,
        phone_number: profileDTO.phone_number,
        no_identity: profileDTO.no_identity,
        birth_date: profileDTO.birth_date,
        birth_place: profileDTO.birth_place,
        address: profileDTO.address,
        gender: profileDTO.gender,
        work_in: profileDTO.work_in,
        blood_type: profileDTO.blood_type,
        marital_status: profileDTO.marital_status,
        nationality: profileDTO.nationality,
        religion: profileDTO.religion,
        city_id: profileDTO.city_id,
        neighborhood_no: profileDTO.neighborhood_no,
        citizen_no: profileDTO.citizen_no,
        area_code: profileDTO.area_code,
      };

      const updateProfile = await this.authService.update_profile(
        token,
        profile,
      );

      if ((await updateProfile).status == true) {
        return res.status(200).json(format_json(
          200,
          true,
          null,
          null,
          (await updateProfile).message,
          {
            user: (await updateProfile).users,
            token: updateProfile.token
          },
        ));
      } else {
        return res.status(400).json(format_json(
          400,
          false,
          null,
          null,
          (await updateProfile).message,
          null,
        ));
      }
    } catch (error) {
      return res.status(400).json(format_json(400, false, true, null, 'Server Error', error));
    }
  }

  @Post('users/change-password')
  @UseGuards(AuthGuard('jwt'))
  async change_password(
    @Body() ChangePassDTO: ChangePassDTO,
    @Req() req: Request,
    @Res() res: Response
  ) {
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

      const { password, confirmPassword } = ChangePassDTO;

      const change_password = this.authService.change_pass(token, password);

      if ((await change_password).status === true) {
        return res.status(200).json(format_json(
          200,
          true,
          null,
          null,
          (await change_password).message,
          {
            user: (await change_password).users,
            token: (await change_password).token
          },
        ));
      } else {
        return res.status(400).json(format_json(
          400,
          false,
          null,
          null,
          (await change_password).message,
          null,
        ));
      }
    } catch (error) {
      return res.status(400).json(format_json(400, false, true, null, 'Server Error', error));
    }
  }

  @Get('auth/google')
  @UseGuards(GoogleOauthGuard)
  async auth() {}

  @Get('auth/google-callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    const token = await this.authService.google_auth(req.user);

    return res.status(200).json(format_json(200, true, null, null, token.message, {
      user: token.users,
      token: token.token
    }));
  }


  @Post('users/logout')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Req() req: Request,@Res() res: Response) {
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

     const  logout = this.authService.addToBlacklist(token);
     
     return res.status(200).json(format_json(200, true, null, null, 'Success logout', null));
    } catch (error) {
      return res.status(400).json(format_json(400, false, true, null, 'Server Error', error));
    }
  }
}
