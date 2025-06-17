import { Class } from 'src/class/entities/class.entity';
import { AcademicYear } from '../../academic-year/entity/academic-year.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Admission } from 'src/admission/entities/admission.entity';

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

  @Column({ type: 'int', nullable: false })
  pin_code: number;

  @Column({ type: 'date', nullable: false })
  establishment_year: Date;

  // relation with academic years
  @OneToMany(()=> AcademicYear,(academicYear)=>academicYear.school, {eager:true})
  academicYears: AcademicYear[];

  // relation with classes 
  @OneToMany(()=> Class, (cls)=>cls.school)
  classes: Class[];

  // relation with admission
  @OneToMany(() => Admission, (admission) => admission.school)
  admissions: Admission[];
}
