import { AuthLevel } from '../auth-level.enum'

export class LoggedUser {
  sub: number
  username: string
  level: AuthLevel
}
