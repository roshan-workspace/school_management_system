import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  subject_id: number;

  @Column()
  subject_name: string;

//   @OneToMany(() => SectionSubject, (ss) => ss.subject)
//   sectionSubjects: SectionSubject[];
}
