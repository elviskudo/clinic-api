import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  ParseUUIDPipe
} from '@nestjs/common';
import { User } from '../entity/profile/user.entity';
import { UserService } from '../service/user.service';
import { DeleteUserDto } from 'src/dto/auth/userdelete.dto';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('delete')
  async deleteUser(@Body() DeleteuserDTO: DeleteUserDto): Promise<String> {
    const user = this.userService.delete(DeleteuserDTO.email);

    if(user){
      return (await user).message;
    } else {
      return 'gagal';
    }
  }
}
