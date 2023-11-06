import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Class } from 'src/class/class.entity'

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false, unique: true })
  name: string

  @OneToMany(() => Class, (c) => c.subject)
  classes: Class[]
}
