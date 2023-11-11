import { Injectable } from '@nestjs/common'
import { Student } from './student.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly adminRepository: Repository<Student>,
  ) {}

  async findOne(username: string): Promise<Student | undefined> {
    return this.adminRepository.findOne({
      where: {
        username: username,
      },
    })
  }
}
