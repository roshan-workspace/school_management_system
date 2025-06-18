import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubjectDto {
  @IsString({ message: 'Subject name must be a string' })
  @IsNotEmpty({ message: 'Subject name is required' })
  subject_name: string;
}
