import {  IsInt, IsNotEmpty } from "class-validator";

export class CreateSectionSubjectDto {
        @IsNotEmpty()
        @IsInt()
        subject_id:number;
    
        @IsNotEmpty()
        @IsInt()
        sec_id:number;
        
        @IsNotEmpty()
        @IsInt()
        staff_id:number;
}
