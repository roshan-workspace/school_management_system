import { Class } from "src/class/entities/class.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['section_name', 'class_id'])
export class Section {
    @PrimaryGeneratedColumn()
    sec_id:number;

    @Column()
    section_name:string;

    @Column()
    class_id:number;

    @ManyToOne(()=>Class,(cls)=>cls.sections)
    @JoinColumn({name:'class_id'})
    class:Class
}
