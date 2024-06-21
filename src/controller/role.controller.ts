import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from '../service/role.service';
import { Role } from '../entity/role.entity';
import { Roles } from 'src/middleware/role.decorator';
import { RolesGuard } from 'src/middleware/role.guard';

@Controller('roles')
@UseGuards(RolesGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @Roles('admin', 'doctor', 'patient')
  async findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'doctor', 'patient')
  async findById(@Param('id') id: string): Promise<Role> {
    return this.roleService.findById(parseInt(id, 10));
  }

  @Post()
  @Roles('admin')
  async create(@Body() role: Role): Promise<Role> {
    return this.roleService.create(role);
  }

  @Put(':id')
  @Roles('admin')
  async update(@Param('id') id: string, @Body() role: Role): Promise<Role> {
    return this.roleService.update(parseInt(id, 10), role);
  }

  @Delete(':id')
  @Roles('admin')
  async delete(@Param('id') id: string): Promise<void> {
    return this.roleService.delete(parseInt(id, 10));
  }
}
