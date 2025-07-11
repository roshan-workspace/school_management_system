
import { IsIn, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateClassDto {
  @IsString()
  @IsNotEmpty()
  class_name: string;

  @IsInt()
  school_id: number;

  @IsInt()
  acad_year_id: number;

  @IsInt()
  @IsNotEmpty()
  no_of_periods: number;
}
