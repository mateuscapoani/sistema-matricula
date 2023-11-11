import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { authConstants } from './auth.constant'
import { AuthAdminGuard } from './auth-admin.guard'
import { AuthStudentGuard } from './auth-student.guard'
import { AdminModule } from 'src/admin/admin.module'
import { StudentModule } from 'src/student/student.module'

@Module({
  imports: [
    AdminModule,
    StudentModule,
    JwtModule.register({
      global: true,
      secret: authConstants.jwtSecret,
      signOptions: { expiresIn: '300s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthAdminGuard, AuthStudentGuard],
  exports: [AuthService, AuthAdminGuard, AuthStudentGuard],
})
export class AuthModule {}
