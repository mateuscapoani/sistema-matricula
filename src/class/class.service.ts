import { Injectable, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Class } from './class.entity'
import { Repository } from 'typeorm'
import { CreateClass } from './dto/create-class.dto'
import { SubjectService } from 'src/subject/subject.service'
import { TeacherService } from 'src/teacher/teacher.service'
import { Teacher } from 'src/teacher/teacher.entity'
import { AuthService } from 'src/auth/auth.service'
import { StudentService } from 'src/student/student.service'
import { AuthLevel } from 'src/auth/auth-level.enum'
import { Student } from 'src/student/student.entity'
import { ClassGrade } from './dto/class-grade.dto'

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
    private readonly subjectService: SubjectService,
    private readonly teacherService: TeacherService,
    private readonly authService: AuthService,
    private readonly studentService: StudentService,
  ) {}

  async create(createClass: CreateClass): Promise<Class> {
    const subject = await this.subjectService.findOne(createClass.subjectId)
    const teacher = await this.teacherService.findOne(createClass.teacherId)

    this.validateTeacherUnavailable(
      teacher,
      createClass.dayOfTheWeek,
      createClass.shift,
    )

    return this.classRepository.save({
      dayOfTheWeek: createClass.dayOfTheWeek,
      shift: createClass.shift,
      capacity: createClass.capacity,
      subject,
      teacher,
    })
  }

  findAll(): Promise<Class[]> {
    return this.classRepository.find({
      order: {
        id: 'ASC',
      },
      relations: {
        subject: true,
        teacher: true,
        students: true,
      },
    })
  }

  async findOne(id: number): Promise<Class> {
    const c = await this.classRepository.findOne({
      where: { id },
      relations: {
        subject: true,
        teacher: true,
        students: true,
      },
    })
    if (!c) throw new BadRequestException('Turma inexistente')
    return c
  }

  async edit(id: number, createClass: CreateClass): Promise<Class | null> {
    const c = await this.findOne(id)

    if (c.subject.id !== createClass.subjectId) {
      const subject = await this.subjectService.findOne(createClass.subjectId)
      c.subject = subject
    }

    if (c.teacher.id !== createClass.teacherId) {
      const teacher = await this.teacherService.findOne(createClass.teacherId)
      this.validateTeacherUnavailable(
        teacher,
        createClass.dayOfTheWeek,
        createClass.shift,
      )
      c.teacher = teacher
    }

    c.dayOfTheWeek = createClass.dayOfTheWeek
    c.shift = createClass.shift
    c.capacity = createClass.capacity
    return this.classRepository.save(c)
  }

  async enrollmentRequest(request: any, classId: number): Promise<void> {
    const student = await this.getStudentByRequest(request)
    const c = await this.findOne(classId)

    if (this.validateSameClass(student.classes, c))
      throw new BadRequestException('Aluno ja está matriculado nessa turma')

    if (this.validateUnavailable(student.classes, c.dayOfTheWeek, c.shift))
      throw new BadRequestException('Aluno ocupado neste dia da semana e turno')

    if (this.validateSameSubject(student.classes, c))
      throw new BadRequestException('Aluno ja está cursando essa materia')

    if (this.validateCapacity(c)) throw new BadRequestException('Turma lotada')

    c.students.push(student)
    this.classRepository.save(c)
  }

  validateTeacherUnavailable(
    teacher: Teacher,
    dayOfTheWeek: number,
    shift: number,
  ): void {
    if (this.validateUnavailable(teacher.classes, dayOfTheWeek, shift))
      throw new BadRequestException(
        'Professor ocupado neste dia da semana e turno',
      )
  }

  validateUnavailable(
    classes: Class[],
    dayOfTheWeek: number,
    shift: number,
  ): boolean {
    return classes?.some(
      (c) => c.dayOfTheWeek === dayOfTheWeek && c.shift === shift,
    )
  }

  validateSameClass(classes: Class[], c: Class): boolean {
    return classes?.some((c1) => c1.id === c.id)
  }

  validateSameSubject(classes: Class[], c: Class): boolean {
    return classes?.some(async (c1) => {
      const classWithSubject = await this.findOne(c1.id)
      return classWithSubject.subject?.id === c.subject?.id
    })
  }

  validateCapacity(c: Class) {
    if (!c.capacity) return false

    return c.students.length + 1 > c.capacity
  }

  async getGrade(): Promise<ClassGrade[]> {
    const classes: Class[] = await this.findAll()

    return classes.map((c) => {
      const c1: ClassGrade = {
        id: c.id,
        dayOfTheWeek: c.dayOfTheWeek,
        shift: c.shift,
        capacity: c.capacity,
        occupation: c.students.length,
        subject: c.subject.name,
        teacher: c.teacher.name,
      }
      return c1
    })
  }

  async getStudentByRequest(request: any): Promise<Student> {
    const loggedUser = await this.authService.getSessionUser(request)
    if (!loggedUser.level || loggedUser.level !== AuthLevel.Student)
      throw new BadRequestException('Apenas estudantes podem usar')

    return await this.studentService.findOne(loggedUser.sub)
  }
}
