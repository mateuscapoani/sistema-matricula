import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common'
import { StudentService } from './student.service'
import { Student } from './student.entity'
import { AuthAdminGuard } from 'src/auth/auth-admin.guard'
import { CreateStudent } from './dto/create-student.dto'

@Controller('student')
@UseGuards(AuthAdminGuard)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createStudent: CreateStudent): Promise<Student> {
    return this.studentService.create(createStudent)
  }

  @Get()
  findAll(): Promise<Student[]> {
    return this.studentService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Student | null> {
    return this.studentService.findOne(id)
  }

  @Put(':id')
  edit(
    @Param('id') id: number,
    @Body() createStudent: CreateStudent,
  ): Promise<Student | null> {
    return this.studentService.edit(id, createStudent)
  }
}
