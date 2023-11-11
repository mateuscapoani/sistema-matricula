import { Controller, Param, Post, Get, Req, UseGuards } from '@nestjs/common'
import { ClassService } from './class.service'
import { AuthStudentGuard } from 'src/auth/auth-student.guard'

@Controller('class/student')
@UseGuards(AuthStudentGuard)
export class ClassStudentController {
  constructor(private readonly classService: ClassService) {}

  @Get()
  getGrade() {
    return this.classService.getGrade()
  }

  @Post(':classId')
  enrollmentRequest(@Req() request: any, @Param('classId') classId: number) {
    return this.classService.enrollmentRequest(request, classId)
  }
}
