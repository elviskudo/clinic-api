import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/prisma.service';
import { AuthDTO } from 'src/dto/auth/auth.dto';
import { ZodError, z } from 'zod';
import { mailService } from '../mailer/mailer.service';
import { VerifikasiDTO } from 'src/dto/auth/verifikasi.dto';
import * as bcrypt from 'bcrypt';

export function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

@Injectable()
export class AuthenticationService {
  private blacklist: Set<string> = new Set();

  addToBlacklist(token: string) {
    this.blacklist.add(token);
  }

  isInBlacklist(token: string): boolean {
    return this.blacklist.has(token);
  }
  
  constructor(
    private prisma: PrismaService,
    private readonly mailService: mailService,
  ) {}

  async register(AuthDTO) {
    const RegisterSchema = z.object({
      fullname: z.string().max(64).min(1),
      email: z.string().email().min(1),
      phone_number: z.string().min(1),
      password: z
        .string()
        .min(8)
        .regex(/[A-Z]/, {
          message: 'should contain at least one uppercase letter',
        })
        .regex(/[0-9]/, { message: 'should contain at least one number' })
        .min(1),
    });

    try {
      const validatedData = RegisterSchema.parse(AuthDTO);

      const checkuser = await this.prisma.user.findUnique({
        where: {
          email: AuthDTO.email
        },
        include: {
          role: true
        }
      });
      if (checkuser) {
        return {
          status: false,
          message: 'Akun sudah tersedia',
          users: null,
          token: null,
        };
      }

      const getrole = await this.prisma.role.findFirst({
        where : { name: 'patient' }
      })

      const userData = {
        email: AuthDTO.email,
        password: await bcrypt.hash(AuthDTO.password, 10),
        role_id: getrole.id,
        verifed: 0,
      };

      const user = await this.prisma.user.create({ data: userData, include: {
        role: true
      } });

      const dataprofile = {
        fullname: AuthDTO.fullname,
        phone_number: AuthDTO.phone_number,
        profil_image:
          'https://api.dicebear.com/8.x/notionists/svg?seed=' + AuthDTO.fullname,
        no_identity: null,
        birth_date: null,
        birth_place: null,
        address: null,
        gender: null,
        work_in: null,
        blood_type: null,
        marital_status: null,
        nationality: null,
        religion: null,
        user: {
          connect: {
            id: user.id,
          },
        },
        neighborhood_no: null,
        citizen_no: null,
        area_code: null,
        responsibleForCosts: null,
      };

      const profile = await this.prisma.profile.create({ data: dataprofile });

      const otp = generateRandomNumber(100000, 999999);

      const sendemail = this.mailService.sendMail(
        user.email,
        'Verifikasi email',
        otp,
        dataprofile.fullname,
      );

      const saveotp = await this.prisma.otp.create({
        data: {
          kode_otp: otp,
          user_id: user.id,
        },
      });

      const token = jwt.sign(
        { userId: user.id, verifikasi: false },
        process.env.JWT_SECRET,
        {
          expiresIn: '7d',
        },
      );

      return {
        status: true,
        message: 'Berhasil',
        users: {
          id: user.id,
          email: user.email,
          is_verified: user.verifed === 1,
          role: user.role,
          token: token,
        },
      };
    } catch (e: any) {
      if (e instanceof ZodError) {
        const errorMessages = e.errors.map((error) => ({
          field: error.path.join('.'),
          message: error.message,
        }));

        return {
          status: false,
          message: 'Validasi gagal',
          errors: errorMessages,
          users: null,
          token: null,
        };
      }
      return {
        status: false,
        message: e.message || 'Terjadi kesalahan',
        users: null,
        token: null,
      };
    }
  }

  async resendotp(token: string) {
    const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
      const userId = extracttoken.userId;

      const checkuser = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          role: true
        }
      });

      if (!checkuser) {
        return {
          status: false,
          message: 'Akun tidak ditemukan',
          users: {
            id: null,
            email: null,
            is_verified: null,
            role: null,
            token: null,
          },
        };
      }

      const getprofile = await this.prisma.profile.findUnique({
        where: {
          user_id: checkuser.id,
        },
      });

      if (checkuser.verifed == 1) {
        return {
          status: false,
          message: 'Email telah terverifikasi',
          users: {
            id: checkuser.id,
            email: checkuser.email,
            is_verified: checkuser.verifed === 1,
            role: checkuser.role,
            token: null,
          },
        };
      }

      const otp = generateRandomNumber(100000, 999999);

      const sendemail = this.mailService.sendMail(
        checkuser.email,
        'Verifikasi email',
        otp,
        getprofile.fullname,
      );

      const saveotp = await this.prisma.otp.create({
        data: {
          kode_otp: otp,
          user_id: checkuser.id,
        },
      });

      return {
        status: true,
        message: 'Success to resend verification otp',
        users: {
          id: checkuser.id,
          email: checkuser.email,
          is_verified: checkuser.verifed === 1,
          role: checkuser.role,
          token: null,
        },
      };
    } else {
      return {
        status: false,
        message: 'Invalid Payload',
        users: {
          id: null,
          email: null,
          verifikasi: null,
        },
        token: null,
      };
    }
  }


  async verifikasi(VerifikasiDTO, tokenjwt) {
    const RegisterSchema = z.object({
      kode_otp: z.string().min(6),
    });

    try {
      const validatedData = RegisterSchema.parse(VerifikasiDTO);

      const extracttoken = jwt.verify(tokenjwt, process.env.JWT_SECRET);

      if (typeof extracttoken !== 'string' && 'userId' in extracttoken) {
        var userId = extracttoken.userId;
      }

      const checkuser = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          role: true
        }
      });

      if (!checkuser) {
        return {
          status: false,
          message: 'Akun tidak terdaftar',
          users: {
            id: null,
            email: null,
            is_verified: null,
            role: null,
            token: null,
          },
        };
      }

      const getprofile = await this.prisma.profile.findUnique({
        where: {
          user_id: userId,
        },
      });

      if (checkuser.verifed == 1) {
        return {
          status: false,
          message: 'Akun telah di verifikasi',
          users: {
            id: checkuser.id,
            email: checkuser.email,
            is_verified: checkuser.verifed === 1,
            role: checkuser.role,
            token: null,
          },
        };
      }

      const otpExists = await this.prisma.otp.findFirst({
        where: {
          kode_otp: parseInt(VerifikasiDTO.kode_otp),
          user_id: checkuser.id,
          status: 0,
        },
      });

      if (!otpExists) {
        return {
          status: false,
          message: 'OTP Salah',
          users: {
            id: checkuser.id,
            email: checkuser.email,
            is_verified: checkuser.verifed === 1,
            role: checkuser.role,
            token: null,
          },
        };
      }

      const updateotp = await this.prisma.otp.update({
        where: { id: otpExists.id },
        data: { status: 1 },
      });

      const updateuser = await this.prisma.user.update({
        where: { id: checkuser.id },
        data: { verifed: 1 },
      });

      const newToken = jwt.sign(
        { userId: checkuser.id, verifikasi: false },
        process.env.JWT_SECRET,
        {
          expiresIn: '7d',
        },
      );

      return {
        status: true,
        message: 'Berhasil',
        users: {
          id: checkuser.id,
          email: checkuser.email,
          is_verified: checkuser.verifed === 1,
          role: checkuser.role,
          token: newToken,
        },
      };
    } catch (e: any) {
      if (e instanceof ZodError) {
        const errorMessages = e.errors.map((error) => ({
          field: error.path.join('.'),
          message: error.message,
        }));

        return {
          status: false,
          message: 'Validasi gagal',
          errors: errorMessages,
          users: null,
          token: null,
        };
      }
      return {
        status: false,
        message: e.message || 'Terjadi kesalahan',
        users: null,
        token: null,
      };
    }
  }

  async signin(authDTO: AuthDTO) {
    const SigninSchema = z.object({
      email: z.string().email().min(1),
      password: z.string().min(8),
    });

    try {
      const validatedData = SigninSchema.parse(authDTO);

      const user = await this.prisma.user.findUnique({
        where: { email: authDTO.email },
        include: {
          role: true
        }
      });

      if (!user) {
        return {
          status: false,
          message: 'User not found',
          users: null,
          token: null,
        };
      }

      const isPasswordValid = await bcrypt.compare(validatedData.password, user.password);

      if (!isPasswordValid) {
        return {
          status: false,
          message: 'Password failed',
          users: {
            id: null,
            email: null,
            role: null,
            verifikasi: false,
          },
          token: null,
        };
      }

      if (user.verifed == 0) {
        const token_verifikasi = jwt.sign(
          { userId: user.id, verifikasi: false },
          process.env.JWT_SECRET,
          { expiresIn: '7d' },
        );
  
        return {
          status: true,
          message: 'verification your account',
          users: {
            id: user.id,
            email: user.email,
            role: user.role,
            verifikasi: false,
          },
          token: token_verifikasi,
        };
      }

      const token = jwt.sign(
        { userId: user.id, verifikasi: user.verifed === 1 },
        process.env.JWT_SECRET,
        {
          expiresIn: '7d',
        },
      );

      return {
        status: true,
        message: 'Berhasil login',
        users: {
          id: user.id,
          email: user.email,
          is_verified: user.verifed === 1,
          role: user.role,
          token: token,
        },
      };
    } catch (e: any) {
      if (e instanceof ZodError) {
        const errorMessages = e.errors.map((error) => ({
          field: error.path.join('.'),
          message: error.message,
        }));

        return {
          status: false,
          message: 'Validasi gagal',
          errors: errorMessages,
          users: null,
          token: null,
        };
      }
      return {
        status: false,
        message: e.message || 'Terjadi kesalahan',
        users: null,
        token: null,
      };
    }
  }

  async signout(tokenjwt : string) {

    try {
      this.addToBlacklist(tokenjwt);

      return {
        status: true,
        message: 'Berhasil signout',
      };
    } catch (e: any) {
      if (e instanceof ZodError) {
        const errorMessages = e.errors.map((error) => ({
          field: error.path.join('.'),
          message: error.message,
        }));

        return {
          status: false,
          message: 'Validasi gagal',
          errors: errorMessages,
          users: null,
          token: null,
        };
      }
      return {
        status: false,
        message: e.message || 'Terjadi kesalahan',
        users: null,
        token: null,
      };
    }
  }

  async change_pass(
    token: string,
    password: string,
  ) {
    const RegisterSchema = z.object({
      password: z
        .string()
        .min(8)
        .regex(/[A-Z]/, {
          message: 'should contain at least one uppercase letter',
        })
        .regex(/[0-9]/, { message: 'should contain at least one number' })
        .min(1),
    });

    try {
      const extracttoken = jwt.verify(token, process.env.JWT_SECRET);

      if (
        typeof extracttoken !== 'string' &&
        'userId' in extracttoken &&
        'verifikasi' in extracttoken
      ) {
        const userId = extracttoken.userId;
        const userVerifikasi = extracttoken.verifikasi;

        if (userVerifikasi == false) {
          return {
            status: false,
            message: 'Silakan verifikasi akun anda',
            users: {
              id: null,
              email: null,
              is_verified: null,
              role: null,
              token: null,
            },
          };
        }

        const checkuser = await this.prisma.user.findUnique({
          where: {
            id: userId,
          },
          include: {
            role: true
          }
        });

        if (!checkuser) {
          return {
            status: false,
            message: 'User tidak di temukan',
            users: {
              id: null,
              email: null,
              is_verified: null,
              role: null,
              token: null,
            },
          };
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          checkuser.password,
        );

        if (isPasswordValid) {
          return {
            status: false,
            message: 'Kata sandi sama seperti yang lama',
            users: {
              id: checkuser.id,
              email: checkuser.email,
              is_verified: checkuser.verifed === 1,
              role: checkuser.role,
              token: null,
            },
          };
        }

        const newpassword = await bcrypt.hash(password, 10);
      
        const updateprofile = await this.prisma.user.update({
          where: { id: userId },
          data: { 
            password: newpassword
          },
        });

        return {
          status: true,
          message: 'Berhasil ubah kata sandi',
          users: {
            id: checkuser.id,
            email: checkuser.email,
            is_verified: checkuser.verifed === 1,
            role: checkuser.role,
            token: null,
          },
        };
      } else {
        return {
          status: false,
          message: 'Invalid Payload',
          users: {
            id: null,
            email: null,
            verifikasi: null,
          },
          token: null,
        };
      }
      } catch (e: any) {
        if (e instanceof ZodError) {
          const errorMessages = e.errors.map((error) => ({
            field: error.path.join('.'),
            message: error.message,
          }));

          return {
            status: false,
            message: 'Validasi gagal',
            errors: errorMessages,
            users: null,
            token: null,
          };
        }
        return {
          status: false,
          message: e.message || 'Terjadi kesalahan',
          users: null,
          token: null,
        };
      }
    }

}
