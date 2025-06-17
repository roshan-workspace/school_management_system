// import { Class } from "src/class/entities/class.entity";
import { Class } from "src/class/entities/class.entity";
import { School } from "src/school/entity/school.entity";
import { Check, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('academic_year')
@Unique(['start_year', 'end_year'])
@Check(`"end_year" = "start_year"+1`)
export class AcademicYear {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    start_year:number;

    @Column()
    end_year:number;

    @Column()
    school_id:number;

    @ManyToOne(()=>School, (school)=>school.academicYears)
    @JoinColumn({name:'school_id'})
    school:School;

    @OneToMany(()=> Class, (cls)=>cls.academicYear)
    classes: Class[];

}
