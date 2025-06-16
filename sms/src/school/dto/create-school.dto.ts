import { IsString, IsInt, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateSchoolDto {
  @IsString()
  @IsNotEmpty()
  school_name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsInt()
  pin_code: number;
  

  @IsDateString()
  establishment_year: Date;
}
