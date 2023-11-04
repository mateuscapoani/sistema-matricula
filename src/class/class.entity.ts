import { Student } from 'src/student/student.entity'
import { Teacher } from 'src/teacher/teacher.entity'
import { Subject } from 'src/subject/subject.entity'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm'

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  dayOfTheWeek: number

  @Column()
  shift: number

  @ManyToOne(() => Subject, (s) => s.classes)
  subject: Subject

  @ManyToOne(() => Teacher, (t) => t.classes)
  teacher: Teacher

  @ManyToMany(() => Student, (s) => s.classes)
  @JoinTable({ name: 'class_students' })
  students: Student[]
}
