import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { School } from "src/school/entity/school.entity";
import { AcademicYear } from "src/academic-year/entity/academic-year.entity";
import { Section } from "src/section/entities/section.entity";


@Entity()
@Unique(['class_name'])
export class Class{
    @PrimaryGeneratedColumn()
    class_id :number

    @Column()
    class_name:string;
    
    @Column()
    school_id:number;

    @Column()
    acad_year_id:number;

    @ManyToOne(()=>School, (school)=>school.classes)
    @JoinColumn({name:"school_id"})
    school:School;

    @ManyToOne(()=>AcademicYear,(acdm)=>acdm.classes)
    @JoinColumn({name:'acad_year_id'})
    academicYear:AcademicYear

    @OneToMany(()=>Section,(sec)=>sec.class)
    sections:Section[]

}


