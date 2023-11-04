import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Class } from 'src/class/class.entity'

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    unique: true,
  })
  name: string

  @ManyToOne(() => Class, (c) => c.subject)
  classes: Class[]
}
