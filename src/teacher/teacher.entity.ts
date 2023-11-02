import { Class } from 'src/class/class.entity'
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  username: string

  @Column()
  password: string

  @OneToMany(() => Class, (c) => c.teacher)
  classes: Class[]
}
