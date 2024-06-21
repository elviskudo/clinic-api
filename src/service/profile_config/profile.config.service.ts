import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileConfiguration } from 'src/entity/profile_config/profile.config.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileConfigurationService {
  constructor(
    @InjectRepository(ProfileConfiguration)
    private readonly profileConfigRepository: Repository<ProfileConfiguration>,
  ) {}

  findByUserId(userId: number): Promise<ProfileConfiguration> {
    return this.profileConfigRepository.findOne({
      where: { user: { id: userId } },
    });
  }

  async create(
    profileConfig: Partial<ProfileConfiguration>,
  ): Promise<ProfileConfiguration> {
    const newConfig = this.profileConfigRepository.create(profileConfig);
    return this.profileConfigRepository.save(newConfig);
  }

  async update(
    userId: number,
    updateData: Partial<ProfileConfiguration>,
  ): Promise<ProfileConfiguration> {
    const config = await this.findByUserId(userId);
    if (!config) {
      throw new NotFoundException('Profile configuration not found');
    }
    Object.assign(config, updateData);
    return this.profileConfigRepository.save(config);
  }
}
