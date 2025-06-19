import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, ValidationPipe } from '@nestjs/common';
import { FeeStructureService } from './fee-structure.service';
import { CreateFeeStructureDto } from './dto/create-fee-structure.dto';

@Controller('fee-structure')
export class FeeStructureController {
  constructor(private readonly feeService: FeeStructureService) {}

  @Post()
  create(@Body(ValidationPipe) dto: CreateFeeStructureDto) {
    return this.feeService.create(dto);
  }

  @Get()
  findAll() {
    return this.feeService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.feeService.findById(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number){
    return this.feeService.remove(id)
  }
}
