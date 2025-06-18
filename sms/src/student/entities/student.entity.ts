import { Section } from 'src/section/entities/section.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  Unique,
} from 'typeorm';
import { Admission } from './admission.entity';


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
}
