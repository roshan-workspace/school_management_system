import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  Check,
  OneToMany,
} from 'typeorm';
import { School } from 'src/school/entity/school.entity';
import { Gender, StaffRole } from '../constants/const';
import { SectionSubject } from 'src/section-subject/entities/section-subject.entity';

@Entity('staff')
@Unique(['username'])
@Unique(['email'])
@Check(`"gender" IN ('male', 'female', 'other')`)
@Check(`"role" IN ('admin','principal','teacher','librarian','accountant','vice principal')`)
export class Staff {
  @PrimaryGeneratedColumn()
  staff_id: number;

  @Column({ type: 'text' })
  full_name: string;

  @Column({ type: 'text' })
  gender: Gender;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'varchar' })
  state: string;

  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'varchar' })
  pin_code: string;

  @Column({ type: 'text' })
  subject_specialization: string;

  @Column({ type: 'boolean' })
  is_teaching_staff: boolean;

  @Column({ type: 'date' })
  hire_date: Date;

  @Column({ type: 'text', nullable: true })
  qualification: string;

  @Column()
  school_id: number;

  @ManyToOne(() => School, (school) => school.staffs)
  @JoinColumn({ name: 'school_id' })
  school: School;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'varchar' })
  role: StaffRole;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(()=>SectionSubject, (ss)=>ss.staff)
  sectionSubjects: SectionSubject[];
}
