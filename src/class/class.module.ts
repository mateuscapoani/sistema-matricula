import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Class } from './class.entity'
import { ClassService } from './class.service'
import { ClassAdminController } from './class-admin.controller'
import { ClassStudentController } from './class-student.controller'
import { TeacherModule } from 'src/teacher/teacher.module'
import { SubjectModule } from 'src/subject/subject.module'
import { AuthModule } from 'src/auth/auth.module'
import { StudentModule } from 'src/student/student.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Class]),
    SubjectModule,
    TeacherModule,
    AuthModule,
    StudentModule,
  ],
  providers: [ClassService],
  controllers: [ClassAdminController, ClassStudentController],
})
export class ClassModule {}
