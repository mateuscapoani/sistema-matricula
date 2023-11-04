import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Teacher } from './teacher.entity'
import { CreateTeacher } from './dto/create-teacher.dto'

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  create(createTeacher: CreateTeacher): Promise<Teacher> {
    return this.teacherRepository.save({ ...createTeacher })
  }

  findAll(): Promise<Teacher[]> {
    return this.teacherRepository.find({
      order: {
        name: 'ASC',
        id: 'ASC',
      },
    })
  }

  async findOne(id: number): Promise<Teacher> {
    const teacher = await this.teacherRepository.findOneBy({ id })
    if (!teacher) throw new BadRequestException()
    return teacher
  }

  async edit(
    id: number,
    createTeacher: CreateTeacher,
  ): Promise<Teacher | null> {
    const teacher = await this.findOne(id)

    teacher.name = createTeacher.name
    return this.teacherRepository.save(teacher)
  }
}
