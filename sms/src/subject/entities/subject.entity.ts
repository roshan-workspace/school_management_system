import { SectionSubject } from 'src/section-subject/entities/section-subject.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  subject_id: number;

  @Column({ unique: true })
  subject_name: string;

  @OneToMany(() => SectionSubject, (ss) => ss.subject)
  sectionSubjects: SectionSubject[];
}
