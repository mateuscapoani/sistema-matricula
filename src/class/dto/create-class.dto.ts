import { IsNotEmpty } from 'class-validator'

export class CreateClass {
  @IsNotEmpty()
  dayOfTheWeek: number

  @IsNotEmpty()
  shift: number

  @IsNotEmpty()
  capacity: number

  @IsNotEmpty()
  subjectId: number

  @IsNotEmpty()
  teacherId: number
}
