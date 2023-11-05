import { BadRequestException, Injectable } from '@nestjs/common'
import { Subject } from './subject.entity'
import { CreateSubject } from './dto/create-subject.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  create(createSubject: CreateSubject): Promise<Subject> {
    return this.subjectRepository.save({ ...createSubject })
  }

  findAll(): Promise<Subject[]> {
    return this.subjectRepository.find({
      order: {
        name: 'ASC',
        id: 'ASC',
      },
    })
  }

  async findOne(id: number): Promise<Subject> {
    const subject = await this.subjectRepository.findOneBy({ id })
    if (!subject) throw new BadRequestException()
    return subject
  }

  async edit(
    id: number,
    createSubject: CreateSubject,
  ): Promise<Subject | null> {
    const subject = await this.findOne(id)

    subject.name = createSubject.name
    return this.subjectRepository.save(subject)
  }
}
