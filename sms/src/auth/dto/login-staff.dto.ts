import { IsString, IsNotEmpty } from 'class-validator';

export class LoginStaffDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
