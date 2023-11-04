import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  HttpCode,
} from '@nestjs/common'
import { TeacherService } from './teacher.service'
import { Teacher } from './teacher.entity'
import { CreateTeacher } from './dto/create-teacher.dto'

@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createTeacher: CreateTeacher): Promise<Teacher> {
    return this.teacherService.create(createTeacher)
  }

  @Get()
  findAll(): Promise<Teacher[]> {
    return this.teacherService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Teacher | null> {
    return this.teacherService.findOne(id)
  }

  @Put(':id')
  edit(
    @Param('id') id: number,
    @Body() createTeacher: CreateTeacher,
  ): Promise<Teacher | null> {
    return this.teacherService.edit(id, createTeacher)
  }
}
