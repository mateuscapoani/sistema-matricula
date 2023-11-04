import { Class } from 'src/class/class.entity'
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm'

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({
    unique: true,
  })
  username: string

  @Column()
  password: string

  @ManyToMany(() => Class, (c) => c.students)
  classes: Class[]
}
