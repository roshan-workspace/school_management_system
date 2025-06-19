import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { School } from 'src/school/entity/school.entity';
import { AcademicYear } from 'src/academic-year/entity/academic-year.entity';
import { Section } from 'src/section/entities/section.entity';
import { FeeStructure } from 'src/student/feeStructure/entities/fee-structure.entity';

@Entity('class')
@Unique(['class_name'])
export class Class {
  @PrimaryGeneratedColumn()
  class_id: number;

  @Column()
  class_name: string;

  @Column({ type: 'int', nullable: false })
  no_of_periods: number;

  // relation related configration
  @Column()
  school_id: number;

  @Column()
  acad_year_id: number;

  @ManyToOne(() => School, (school) => school.classes)
  @JoinColumn({ name: 'school_id' })
  school: School;

  @ManyToOne(() => AcademicYear, (acdm) => acdm.classes)
  @JoinColumn({ name: 'acad_year_id' })
  academicYear: AcademicYear;

  @OneToMany(() => Section, (sec) => sec.class)
  sections: Section[];

  @OneToOne(() => FeeStructure, (feeStructure) => feeStructure.class)
  @JoinColumn({ name: 'fee_struct_id' })
  feeStructure: FeeStructure;
}
