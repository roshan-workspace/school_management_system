import { IsInt, IsNotEmpty } from "class-validator";

export class CreateStudentDto{
    @IsInt()
    @IsNotEmpty()
    sec_id:number;

    @IsInt()
    @IsNotEmpty()
    adm_id:number;
}