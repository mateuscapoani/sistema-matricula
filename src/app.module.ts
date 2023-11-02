import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdminModule } from './admin/admin.module'
import { StudentModule } from './student/student.module'
import { TeacherModule } from './teacher/teacher.module'
import { ClassModule } from './class/class.module'
import { SubjectModule } from './subject/subject.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/*.entity{ .ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    AdminModule,
    StudentModule,
    TeacherModule,
    ClassModule,
    SubjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
