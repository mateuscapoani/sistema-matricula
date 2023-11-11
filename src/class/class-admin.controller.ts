import {
  Controller,
  UseGuards,
  Post,
  HttpCode,
  Get,
  Put,
  Param,
  Body,
} from '@nestjs/common'
import { ClassService } from './class.service'
import { AuthAdminGuard } from 'src/auth/auth-admin.guard'
import { Class } from './class.entity'
import { CreateClass } from './dto/create-class.dto'

@Controller('class/admin')
@UseGuards(AuthAdminGuard)
export class ClassAdminController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createClass: CreateClass): Promise<Class> {
    return this.classService.create(createClass)
  }

  @Get()
  findAll(): Promise<Class[]> {
    return this.classService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Class | null> {
    return this.classService.findOne(id)
  }

  @Put(':id')
  edit(
    @Param('id') id: number,
    @Body() createClass: CreateClass,
  ): Promise<Class | null> {
    return this.classService.edit(id, createClass)
  }
}
