import { Injectable } from '@nestjs/common'
import { Admin } from './admin.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateAdmin } from './dto/create-admin.dto'
import { BadRequestException } from '@nestjs/common'

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async findOneByUsername(username: string): Promise<Admin | undefined> {
    return this.adminRepository.findOne({
      where: {
        username: username,
      },
    })
  }

  async findOne(id: number): Promise<Admin> {
    const entity = await this.adminRepository.findOne({
      where: { id }
    })
    if (!entity) throw new BadRequestException('Admin inexistente')
    return entity
  }

  create(createAdmin: CreateAdmin): Promise<Admin> {
    return this.adminRepository.save({ ...createAdmin })
  }

  findAll(): Promise<Admin[]> {
    return this.adminRepository.find({
      order: {
        name: 'ASC',
        id: 'ASC',
      }
    })
  }

  async edit(
    id: number,
    createAdmin: CreateAdmin,
  ): Promise<Admin | null> {
    const admin = await this.findOne(id)
    const adminByUsername = await this.findOneByUsername(
      createAdmin.username,
    )

    if (adminByUsername && admin.id !== adminByUsername.id)
      throw new BadRequestException('Username em uso')

    admin.name = createAdmin.name
    admin.username = createAdmin.username
    admin.password = createAdmin.password
    return this.adminRepository.save(admin)
  }
}
