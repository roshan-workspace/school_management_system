import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Admission } from './entities/admission.entity';
import { CreateAdmissionDto } from './dto/create-admission.dto';
import { UpdateAdmissionDto } from './dto/update-admission.dto';
import { Student } from './entities/student.entity';
import { Guardian } from 'src/guardian/entities/guardian.entity';
import { School } from 'src/school/entity/school.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { Section } from 'src/section/entities/section.entity';
import { UpdateStudentDto } from './dto/update-student.dto';
import { CreateStudentAttendanceDto } from './dto/create-student_attendance.dto';
import { StudentAttendance } from './entities/student-attendance.entity';
import { UpdateStudentAttendanceDto } from './dto/update-student_attendance.dto';


import * as bcrypt from 'bcrypt';
@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Admission)
    private readonly admissionRepo: Repository<Admission>,
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(Guardian)
    private readonly guardianRepo: Repository<Guardian>,
    @InjectRepository(School)
    private readonly schoolRepo: Repository<School>,
    @InjectRepository(Section)
    private readonly sectionRepo: Repository<Section>,
    @InjectRepository(StudentAttendance)
    private readonly attendanceRepo: Repository<StudentAttendance>,
  ) {}
  //  --------------------------- Admissssion Services  --------------------------------------

  async create(dto: CreateAdmissionDto) {
    const guardian = await this.guardianRepo.findOne({
      where: { grdn_id: dto.grdn_id },
    });
    if (!guardian) {
      throw new NotFoundException(`Guardian with ID ${dto.grdn_id} not found`);
    }

    const school = await this.schoolRepo.findOne({
      where: { school_id: dto.school_id },
    });
    if (!school) {
      throw new NotFoundException(`school with ID ${dto.school_id} not found`);
    }

    try {
      const saltRounds = 10;
      const hasedPassword = await bcrypt.hash(dto.password,saltRounds);

      const admission = this.admissionRepo.create({
        ...dto,
        password:hasedPassword
      });
      const admissionInfo = await this.admissionRepo.save(admission);

      const requiredInfo = {
        AdmissionID: admissionInfo.adm_id,
        Name: admissionInfo.fname,
        Dob: admissionInfo.dob,
        Gender: admissionInfo.gender,
        Address: admissionInfo.address,
        GuardianID: admissionInfo.grdn_id,
      };
      return {message:'New Addmission data inserted successfully', data: requiredInfo}
    } catch (error) {
      throw new InternalServerErrorException('Failed to create admission');
    }
  }

  async findAll() {
    try {
      const admissons = await this.admissionRepo.find({
        relations: { guardian: true },
      });
      const requiredInfo = admissons.map((adm) => {
        return {
          AdmissionID: adm.adm_id,
          Name: adm.fname,
          Dob: adm.dob,
          Gender: adm.gender,
          Address: adm.address,
          GuardianID: adm.guardian.grdn_id,
          Guardian: adm.guardian.full_name,
        };
      });

      return { message: 'All data of admission',count:requiredInfo.length, data: requiredInfo };
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong .....');
    }
  }

  async findOne(id: number) {
    const adm= await this.admissionRepo.findOne({
      where: { adm_id: id },
      relations: ['guardian'],
    });
    if (!adm)
      throw new NotFoundException(`Admission with ID ${id} not found`);
    const requiredInfo ={
          AdmissionID: adm.adm_id,
          Name: adm.fname,
          Dob: adm.dob,
          Gender: adm.gender,
          Address: adm.address,
          GuardianID: adm.guardian.grdn_id,
          Guardian: adm.guardian.full_name,
        };
    return {message: `Admission data for ID-${id}`, data: requiredInfo};
  }

  async update(id: number, dto: UpdateAdmissionDto) {
    if (dto.grdn_id) {
      const guardian = await this.guardianRepo.findOne({
        where: { grdn_id: dto.grdn_id },
      });
      if (!guardian) {
        throw new NotFoundException(
          `Guardian with ID ${dto.grdn_id} not found`,
        );
      }
    }

    if (dto.school_id) {
      const school = await this.schoolRepo.findOne({
        where: { school_id: dto.school_id },
      });
      if (!school) {
        throw new NotFoundException(
          `school with ID ${dto.school_id} not found`,
        );
      }
    }

    const admission = await this.admissionRepo.preload({ adm_id: id, ...dto });
    if (!admission)
      throw new NotFoundException(`Admission with ID ${id} not found`);

    try {
      return await this.admissionRepo.save(admission);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update admission');
    }
  }

  async remove(id: number) {
    try {
      const result = await this.admissionRepo.delete(id);
      if (result.affected === 0)
        throw new NotFoundException(`Admission with ID ${id} not found`);
      return { message: 'Admission deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete admission');
    }
  }

  // -----------------Student services --------------------------------

  async createStudent(dto: CreateStudentDto) {
    const section = await this.sectionRepo.findOne({
      where: { sec_id: dto.sec_id },
    });
    if (!section) {
      throw new NotFoundException(`Section with ID ${dto.sec_id} not found`);
    }

    const admission = await this.admissionRepo.findOne({
      where: { adm_id: dto.adm_id },
    });
    if (!admission) {
      throw new NotFoundException(`Admission with ID ${dto.adm_id} not found`);
    }

    const existing = await this.studentRepo.findOne({
      where: {
        section: { sec_id: dto.sec_id },
        admission: { adm_id: dto.adm_id },
      },
    });

    if (existing)
      throw new ConflictException(
        'Student already exists for this section and admission',
      );

    try {
      const newStudent = this.studentRepo.create({
        section,
        admission,
      });
      return await this.studentRepo.save(newStudent);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create new student');
    }
  }

  async findAllStudent() {
    try {
      const studentsInfo = await this.studentRepo.find({
        relations: { admission: true, section: { class: true } },
      });

      const requiredInfo = studentsInfo.map((studInfo) => {
        return {
          Student_ID: studInfo.stud_id,
          AdmissionID: studInfo.admission.adm_id,
          Name: studInfo.admission.fname,
          Gender: studInfo.admission.gender,
          Class: studInfo.section.class.class_name,
          Section: studInfo.section.section_name,
        };
      });

      return requiredInfo;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch students');
    }
  }

  async findOneStudentById(id: number): Promise<Student> {
    try {
      const student = await this.studentRepo.findOne({
        where: { stud_id: id },
        relations: ['section', 'admission'],
      });

      if (!student)
        throw new NotFoundException(`Student with ID ${id} not found`);

      return student;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching student with ID ${id}`,
      );
    }
  }

  async updateStudent(id: number, dto: UpdateStudentDto) {
    if (dto.sec_id) {
      const section = await this.sectionRepo.findOne({
        where: { sec_id: dto.sec_id },
      });
      if (!section) {
        throw new NotFoundException(`Section with ID ${dto.sec_id} not found`);
      }
    }

    if (dto.adm_id) {
      const admission = await this.admissionRepo.findOne({
        where: { adm_id: dto.adm_id },
      });
      if (!admission) {
        throw new NotFoundException(
          `Admission with ID ${dto.adm_id} not found`,
        );
      }
    }

    const student = await this.studentRepo.preload({ stud_id: id, ...dto });
    if (!student)
      throw new NotFoundException(`Student with ID ${id} not found`);

    try {
      return await this.studentRepo.save(student);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update student');
    }
  }

  async removeStudent(id: number) {
    try {
      const result = await this.studentRepo.delete(id);
      if (result.affected === 0)
        throw new NotFoundException(`Admission with ID ${id} not found`);
      return { message: 'Admission deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete admission');
    }
  }

  // ---------------------- Student Attendance Services ------------------------

  async createStudentAttendance(dto: CreateStudentAttendanceDto) {
    const student = await this.studentRepo.findOne({
      where: { stud_id: dto.stud_id },
    });
    if (!student)
      throw new NotFoundException(`Student with ID-${dto.stud_id} Not Found`);

    try {
      const attendance = this.attendanceRepo.create({
        student,
        date: dto.date,
        status: dto.status,
      });

      return await this.attendanceRepo.save(attendance);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to save attendance record',
      );
    }
  }

  async findAllStudentAttendance() {
    try {
      const attendanceList = await this.attendanceRepo.find({
        relations: { student: { section: { class: true }, admission: true } },
      });
      const requiredInfo = attendanceList.map((att) => {
        return {
          StudentAttendanceID: att.stud_attend_id,
          Name: att.student.admission.fname,
          Date: att.date,
          Status: att.status,
          Class: att.student.section.class.class_name,
          Section: att.student.section.section_name,
        };
      });

      return requiredInfo;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch attendance records',
      );
    }
  }

  async findOneAttendanceByAttendanceId(id: number) {
    const record = await this.attendanceRepo.findOne({
      where: { stud_attend_id: id },
      relations: { student: { section: { class: true }, admission: true } },
    });

    if (!record) {
      throw new NotFoundException(`Attendance record with ID ${id} not found`);
    }

    return {
      StudentAttendanceID: record.stud_attend_id,
      Name: record.student.admission.fname,
      Date: record.date,
      Status: record.status,
      Class: record.student.section.class.class_name,
      Section: record.student.section.section_name,
    };
  }

  async updateStudentAttendance(id: number, dto: UpdateStudentAttendanceDto) {
    if (dto.stud_id) {
      const student = await this.studentRepo.findOne({
        where: { stud_id: dto.stud_id },
      });
      if (!student) {
        throw new NotFoundException(`Student with ID ${dto.stud_id} not found`);
      }
    }

    const attendance = await this.attendanceRepo.preload({
      stud_attend_id: id,
      ...dto,
    });
    if (!attendance)
      throw new NotFoundException(`Attendance with ID ${id} has no records`);

    try {
      return await this.attendanceRepo.save(attendance);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update student attendance',
      );
    }
  }

  async removeStudentAttendance(id: number): Promise<string> {
    const attendance = await this.attendanceRepo.findOne({
      where: { stud_attend_id: id },
    });

    if (!attendance) {
      throw new NotFoundException(`Attendance record with ID ${id} not found`);
    }

    try {
      await this.attendanceRepo.remove(attendance);
      return `Attendance record with ID ${id} deleted successfully`;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to delete attendance record',
      );
    }
  }

  async findByStudentName(name: string) {
    const student = await this.studentRepo
      .createQueryBuilder('student')
      .leftJoinAndSelect('student.admission', 'admission')
      .where('admission.fname ILIKE :name', { name: `%${name}%` })
      .getOne();

    if (!student) {
      throw new NotFoundException(
        `Student with first name like ${name} not found`,
      );
    }
    try {
      const attendanceRecords = await this.attendanceRepo.find({
        where: { student: { stud_id: student.stud_id } },
      });

      const summary = {
        present: 0,
        absent: 0,
        late: 0,
        leave: 0,
      };

      for (const record of attendanceRecords) {
        console.log(record);
        if (record.status in summary) {
          summary[record.status]++;
        }
      }

      return {
        studentName: student.admission.fname,
        attendanceSummary: summary,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch attendance summary by student name',
      );
    }
  }
}
