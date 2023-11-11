import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('admin/login')
  adminSignIn(@Body() signInDto: Record<string, any>) {
    return this.authService.adminSignIn(signInDto.username, signInDto.password)
  }

  @HttpCode(HttpStatus.OK)
  @Post('student/login')
  studentSignIn(@Body() signInDto: Record<string, any>) {
    return this.authService.studentSignIn(
      signInDto.username,
      signInDto.password,
    )
  }
}
