// src/guardian/dto/create-guardian.dto.ts

import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsInt,
  IsOptional,
  Min,
  Matches,
} from 'class-validator';

export class CreateGuardianDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsInt()
  @Min(21) //  guardian must be at least 21 years old
  age: number;

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
  @Matches(/^\d{6}$/, { message: 'PIN code must be 6 digits' })
  pin_code: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\+?[0-9]{10}$/, { message: 'Invalid phone number' })
  phone: string;

  @IsString()
  @IsOptional()
  @Matches(/^\+?[0-9]{10}$/, { message: 'Invalid alternate phone number' })
  alternate_phone: string;

  @IsString()
  @IsNotEmpty()
  occupation: string;

  @IsInt()
  @Min(0)
  income: number;
}
