import { Controller, Get, Post, Body, Param,  ValidationPipe } from '@nestjs/common';
import { FeePaymentService } from './fee-payment.service';
import { CreateFeePaymentDto } from './dto/create-fee-payment.dto';

@Controller('fee-payment')
export class FeePaymentController {
  constructor(private readonly feePaymentService: FeePaymentService) {}

  @Post()
  create(@Body(ValidationPipe) createFeePaymentDto: CreateFeePaymentDto) {
    return this.feePaymentService.create(createFeePaymentDto);
  }

  @Get()
  findAll() {
    return this.feePaymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feePaymentService.findById(+id);
  }
}
