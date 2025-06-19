import { IsNotEmpty, IsNumber, IsDateString, IsInt } from 'class-validator';

export class CreateFeeStructureDto {
  @IsInt()
  @IsNotEmpty()
  class_id: number;

  @IsNumber()
  @IsNotEmpty()
  total_amount: number;

  @IsDateString()
  @IsNotEmpty()
  due_date: Date;
}
