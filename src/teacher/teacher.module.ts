import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Teacher } from './teacher.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Teacher])],
})
export class TeacherModule {}
