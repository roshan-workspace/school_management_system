import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateFeePaymentDto {
  @IsInt()
  @IsNotEmpty()
  student_fee_id: number;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsDateString()
  @IsOptional()
  payment_date: Date;

  @IsString()
  @IsOptional()
  payment_time: string;

  @IsString()
  @IsNotEmpty()
  payment_method: string;
}
