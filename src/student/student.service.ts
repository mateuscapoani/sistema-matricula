import { BadRequestException, Injectable } from '@nestjs/common'
import { Student } from './student.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateStudent } from './dto/create-student.dto'

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async findOneByUsername(username: string): Promise<Student | undefined> {
    return this.studentRepository.findOne({
      where: {
        username: username,
      },
    })
  }

  async findOne(id: number): Promise<Student> {
    const entity = await this.studentRepository.findOne({
      where: { id },
      relations: { classes: true },
    })
    if (!entity) throw new BadRequestException('Estudante inexistente')
    return entity
  }

  create(createStudent: CreateStudent): Promise<Student> {
    return this.studentRepository.save({ ...createStudent })
  }

  findAll(): Promise<Student[]> {
    return this.studentRepository.find({
      order: {
        name: 'ASC',
        id: 'ASC',
      },
      relations: {
        classes: true,
      },
    })
  }

  async edit(
    id: number,
    createStudent: CreateStudent,
  ): Promise<Student | null> {
    const student = await this.findOne(id)
    const studentByUsername = await this.findOneByUsername(
      createStudent.username,
    )

    if (studentByUsername && student.id !== studentByUsername.id)
      throw new BadRequestException('Username em uso')

    student.name = createStudent.name
    student.dateOfBirth = createStudent.dateOfBirth
    student.username = createStudent.username
    student.password = createStudent.password
    return this.studentRepository.save(student)
  }
}
