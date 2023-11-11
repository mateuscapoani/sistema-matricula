import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  HttpCode,
  UseGuards,
} from '@nestjs/common'
import { AdminService } from './admin.service'
import { Admin } from './admin.entity'
import { CreateAdmin } from './dto/create-admin.dto'
import { AuthAdminGuard } from 'src/auth/auth-admin.guard'

@Controller('admin')
@UseGuards(AuthAdminGuard)
export class StudentController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createStudent: CreateAdmin): Promise<Admin> {
    return this.adminService.create(createStudent)
  }

  @Get()
  findAll(): Promise<Admin[]> {
    return this.adminService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Admin | null> {
    return this.adminService.findOne(id)
  }

  @Put(':id')
  edit(
    @Param('id') id: number,
    @Body() CreateAdmin: CreateAdmin,
  ): Promise<Admin | null> {
    return this.adminService.edit(id, CreateAdmin)
  }
    
}
