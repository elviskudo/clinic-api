import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';

import { SignInDto } from 'src/dto/signin.dto';
import { UpdateUserDto } from 'src/dto/update.user.dto';
import { User } from 'src/entity/user.entity';
import { JwtAuthGuard } from 'src/guard/jwt.auth.guard';
import { AuthService } from 'src/service/auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signin')
  async signIn(@Body() signInDto: SignInDto): Promise<{ token: string }> {
    const { email, password } = signInDto;
    const token = await this.authService.signIn(email, password);
    return { token };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getProfile(@Request() request: { user: any }): Promise<User> {
    const userId = request.user.userId;
    try {
      const user = await this.authService.getUserById(userId);
      return user;
    } catch (error) {
      throw new Error('Failed to fetch user profile');
    }
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    try {
      return await this.authService.updateUser(id, updateUserDto);
    } catch (error) {
      throw new Error('Failed to update user');
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    try {
      await this.authService.deleteUser(id);
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new Error('Failed to delete user');
    }
  }
}
