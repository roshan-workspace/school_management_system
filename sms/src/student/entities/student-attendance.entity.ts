import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from '../constants/const';
import { Student } from './student.entity';

@Entity('student_attendance')
@Check(`"status" IN ('present', 'absent', 'late', 'leave')`)
export class StudentAttendance {
  @PrimaryGeneratedColumn()
  stud_attend_id: number;

  @Column({ type: 'date', nullable: false, default: () => 'CURRENT_DATE' })
  date: Date;

  @Column({type:'enum',enum:Status , nullable:false})
  status: Status;

  @ManyToOne(()=>Student, (stud)=>stud.attendances, {nullable:false})
  @JoinColumn({name:'stud_id'})
  student:Student
}
