import { Section } from 'src/section/entities/section.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  Unique,
  OneToMany,
} from 'typeorm';
import { Admission } from './admission.entity';
import { StudentAttendance } from './student-attendance.entity';
import { StudentFee } from '../studentFee/entities/student-fee.entity';


@Entity('student')
@Unique(['section', 'admission']) 
export class Student {
  @PrimaryGeneratedColumn()
  stud_id: number;

  @ManyToOne(() => Section, (sec) => sec.students)
  @JoinColumn({ name: 'sec_id'})
  section: Section;

  @OneToOne(() => Admission,(admission)=>admission.student)
  @JoinColumn({ name: 'adm_id'})
  admission: Admission;

  @OneToMany(()=>StudentAttendance, (StudAtten)=>StudAtten.student)
  attendances:StudentAttendance[];


  @OneToMany(()=>StudentFee,(studentFee)=>studentFee.student)
  studentFees:StudentFee[];


}
