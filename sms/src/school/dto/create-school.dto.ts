import { IsString, IsInt, IsDateString, IsNotEmpty, Length } from 'class-validator';

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

  @IsString()
  @IsNotEmpty()
  @Length(6,6, { message: 'Pin code should be only 6 digits' })
  pin_code: string;

  @IsDateString()
  establishment_year: Date;
}
