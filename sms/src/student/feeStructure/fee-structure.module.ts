import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FeeStructure } from "./entities/fee-structure.entity";
import { Class } from "src/class/entities/class.entity";
import { FeeStructureController } from "./fee-structure.controller";
import { FeeStructureService } from "./fee-structure.service";

@Module({
  imports: [TypeOrmModule.forFeature([FeeStructure, Class])],
  controllers: [FeeStructureController],
  providers: [FeeStructureService],
})
export class FeeStructureModule {}
