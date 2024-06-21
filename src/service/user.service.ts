import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/profile/user.entity';
import { ProfileConfiguration } from 'src/entity/profile_config/profile.config.entity';
import { Profile } from 'src/entity/profile/profile.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(ProfileConfiguration)
    private readonly profileConfigRepository: Repository<ProfileConfiguration>,
    @InjectRepository(Profile)
    private readonly Profilereposity: Repository<Profile>,
  ) {}


  async delete(email: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { email : email }});

    if (!user) {
      return {
        message : 'error'
      };
    }

    await this.profileConfigRepository.delete({ user });
    await this.Profilereposity.delete({ user_id: user.id });
  
    const deleteuser = await this.userRepository.delete(user.id);
    if(deleteuser) {
      return {
        message : 'berhasil'
      };
    }
    return {
      message : 'error'
    };
  }
}
