import { IsNotEmpty } from 'class-validator'

export class CreateTeacher {
  @IsNotEmpty()
  name: string
}
