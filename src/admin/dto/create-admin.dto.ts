import { IsNotEmpty } from 'class-validator'

export class CreateAdmin {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  password: string

}