import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthLevel } from './auth-level.enum'
import { LoggedUser } from './dto/logged-user.dto'
import { AdminService } from 'src/admin/admin.service'
import { StudentService } from 'src/student/student.service'

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private studentService: StudentService,
    private jwtService: JwtService,
  ) {}

  async adminSignIn(username: string, pass: string): Promise<any> {
    const user = await this.adminService.findOneByUsername(username)
    if (user?.password !== pass) {
      throw new UnauthorizedException()
    }
    const payload: LoggedUser = {
      sub: user.id,
      username: user.username,
      level: AuthLevel.Admin,
    }
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }

  async studentSignIn(username: string, pass: string): Promise<any> {
    const user = await this.studentService.findOneByUsername(username)
    if (user?.password !== pass) {
      throw new UnauthorizedException()
    }
    const payload: LoggedUser = {
      sub: user.id,
      username: user.username,
      level: AuthLevel.Student,
    }
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }

  getSessionUser(req: any): Promise<LoggedUser> {
    return req?.user
  }
}
