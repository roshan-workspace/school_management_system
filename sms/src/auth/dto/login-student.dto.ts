import { IsString, IsNotEmpty } from 'class-validator';

export class LoginStudentDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
