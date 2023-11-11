import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { authConstants } from './auth.constant'
import { AuthLevel } from './auth-level.enum'
import { LoggedUser } from './dto/logged-user.dto'

@Injectable()
export class AuthAdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException()
    }
    try {
      const payload: LoggedUser = await this.jwtService.verifyAsync(token, {
        secret: authConstants.jwtSecret,
      })

      request['user'] = payload

      return AuthLevel.Admin === payload.level
    } catch {
      throw new UnauthorizedException()
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
