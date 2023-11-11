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

  @Column({ nullable: false })
  dayOfTheWeek: number

  @Column({ nullable: false })
  shift: number

  @Column({ nullable: true })
  capacity: number

  @ManyToOne(() => Subject, (s) => s.classes, { nullable: false })
  subject: Subject

  @ManyToOne(() => Teacher, (t) => t.classes, { nullable: false })
  teacher: Teacher

  @ManyToMany(() => Student, (s) => s.classes)
  @JoinTable({ name: 'class_students' })
  students: Student[]
}
