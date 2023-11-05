import { IsNotEmpty } from 'class-validator'

export class CreateSubject {
  @IsNotEmpty()
  name: string
}
