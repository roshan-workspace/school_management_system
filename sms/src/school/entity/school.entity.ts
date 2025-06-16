import { AcademicYear } from '../../academic-year/entity/academic-year.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  @OneToMany(()=> AcademicYear,(academicYear)=>academicYear.school, {eager:true})
  academicYears: AcademicYear[]

}
