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
import { SubjectService } from './subject.service'
import { CreateSubject } from './dto/create-subject.dto'
import { Subject } from './subject.entity'
import { AuthAdminGuard } from 'src/auth/auth-admin.guard'

@Controller('subject')
@UseGuards(AuthAdminGuard)
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createSubject: CreateSubject): Promise<Subject> {
    return this.subjectService.create(createSubject)
  }

  @Get()
  findAll(): Promise<Subject[]> {
    return this.subjectService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Subject | null> {
    return this.subjectService.findOne(id)
  }

  @Put(':id')
  edit(
    @Param('id') id: number,
    @Body() createSubject: CreateSubject,
  ): Promise<Subject | null> {
    return this.subjectService.edit(id, createSubject)
  }
}
