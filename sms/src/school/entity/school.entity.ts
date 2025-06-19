import { Class } from 'src/class/entities/class.entity';
import { AcademicYear } from '../../academic-year/entity/academic-year.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Admission } from 'src/student/entities/admission.entity';
import { Staff } from 'src/staff/entities/staff.entity';

@Entity('school')
export class School {
  @PrimaryGeneratedColumn()
  school_id: number;

  @Column({ type: 'varchar', nullable: false })
  school_name: string;

  @Column({ type: 'varchar', nullable: false })
  address: string;

  @Column({ type: 'varchar', nullable: false })
  city: string;

  @Column({ type: 'varchar', nullable: false })
  state: string;

  @Column({ type: 'varchar', nullable: false })
  pin_code: string;

  @Column({ type: 'date', nullable: false })
  establishment_year: Date;

  // relation with academic years
  @OneToMany(()=> AcademicYear,(academicYear)=>academicYear.school)
  academicYears: AcademicYear[];

  // relation with classes 
  @OneToMany(()=> Class, (cls)=>cls.school)
  classes: Class[];

  // relation with admission
  @OneToMany(() => Admission, (admission) => admission.school)
  admissions: Admission[];

  // relation with staff
  @OneToMany(()=> Staff, (stf)=>stf.school)
  staffs:Staff[];
}
