import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateSectionDto {
  @IsString()
  @IsNotEmpty()
  section_name: string;

  @IsInt()
  @IsNotEmpty()
  class_id: number;
}



