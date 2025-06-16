import { IsInt, Min, Max } from 'class-validator';

export class CreateAcademicYearDto {
  @IsInt()
  start_year: number;

  @IsInt()
  end_year: number;

  @IsInt()
  school_id: number;
}
