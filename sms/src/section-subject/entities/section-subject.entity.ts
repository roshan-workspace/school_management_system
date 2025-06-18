import { Section } from "src/section/entities/section.entity";
import { Staff } from "src/staff/entities/staff.entity";
import { Subject } from "src/subject/entities/subject.entity"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['subject_id','sec_id', 'staff_id'])
export class SectionSubject {

    @PrimaryGeneratedColumn()
    sec_sub_id:number;

    @Column()
    subject_id:number;

    @Column()
    sec_id:number;

    @Column()
    staff_id:number;

    @ManyToOne(()=>Subject, (sub)=>sub.sectionSubjects, { onDelete: 'SET NULL' })
    @JoinColumn({name:'subject_id'})
    subject:Subject;

    @ManyToOne(()=>Section, (sec)=>sec.sectionSubjects,  { onDelete: 'SET NULL' })
    @JoinColumn({name:'sec_id'})
    section:Section;

    @ManyToOne(()=>Staff, (staff)=>staff.sectionSubjects, { onDelete: 'SET NULL' })
    @JoinColumn({name:'staff_id'})
    staff:Staff
}
