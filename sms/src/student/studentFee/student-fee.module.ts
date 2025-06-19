import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentFee } from "./entities/student-fee.entity";
import { Student } from "../entities/student.entity";
import { FeeStructure } from "../feeStructure/entities/fee-structure.entity";
import { StudentFeeController } from "./student-fee.controller";
import { StudentFeeService } from "./student-fee.service";

@Module({
  imports: [TypeOrmModule.forFeature([StudentFee, Student, FeeStructure])],
  controllers: [StudentFeeController],
  providers: [StudentFeeService],
})
export class StudentFeeModule {}
