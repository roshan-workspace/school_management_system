import { Class } from "src/class/entities/class.entity";
import { SectionSubject } from "src/section-subject/entities/section-subject.entity";
import { Student } from "src/student/entities/student.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['section_name', 'class_id'])
export class Section{
    @PrimaryGeneratedColumn()
    sec_id:number;

    @Column()
    section_name:string;

    @Column()
    class_id:number;

    @ManyToOne(()=>Class,(cls)=>cls.sections)
    @JoinColumn({name:'class_id'})
    class:Class

    @OneToMany(() => SectionSubject, (ss) => ss.section)
    sectionSubjects: SectionSubject[];

    @OneToMany(()=>Student,(student)=>student.section)
    students:Student[];

}
