import { Class } from 'src/class/class.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm'

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  name: string

  @Column({ nullable: false, unique: true })
  username: string

  @Column({ nullable: false })
  password: string

  @ManyToMany(() => Class, (c) => c.students)
  classes: Class[]
}
