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
import { Roles } from 'src/middleware/role.decorator';
import { RolesGuard } from 'src/middleware/role.guard';
import { RoleDto } from 'src/dto/role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'doctor', 'patient')
  @ApiOperation({ summary: 'Get' })
  @ApiResponse({ status: 200, description: 'Success' })
  async findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'doctor', 'patient')
  @ApiOperation({ summary: 'Details' })
  @ApiResponse({ status: 200, description: 'Success' })
  async findById(@Param('id') id: string) {
    return this.roleService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Create' })
  @ApiResponse({ status: 200, description: 'Success' })
  async create(@Body() role: RoleDto) {
    return this.roleService.create(role);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Update' })
  @ApiResponse({ status: 200, description: 'Success' })
  async update(@Param('id') id: string, @Body() role: RoleDto) {
    return this.roleService.update(id, role);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Delete' })
  @ApiResponse({ status: 200, description: 'Success' })
  async delete(@Param('id') id: string) {
    return this.roleService.delete(id);
  }
}
