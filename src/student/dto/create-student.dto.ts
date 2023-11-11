import { IsNotEmpty } from 'class-validator'

export class CreateStudent {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  dateOfBirth: Date

  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  password: string
}
