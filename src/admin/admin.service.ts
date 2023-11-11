import { Injectable } from '@nestjs/common'
import { Admin } from './admin.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async findOne(username: string): Promise<Admin | undefined> {
    return this.adminRepository.findOne({
      where: {
        username: username,
      },
    })
  }
}
