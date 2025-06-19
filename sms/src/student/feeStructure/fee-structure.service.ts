import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFeeStructureDto } from './dto/create-fee-structure.dto';
import { Class } from 'src/class/entities/class.entity';
import { FeeStructure } from './entities/fee-structure.entity';

@Injectable()
export class FeeStructureService {
  constructor(
    @InjectRepository(FeeStructure)
    private feeStructureRepo: Repository<FeeStructure>,

    @InjectRepository(Class)
    private classRepo: Repository<Class>,
  ) {}

  async create(dto: CreateFeeStructureDto): Promise<FeeStructure> {
    const existingClass = await this.classRepo.findOne({
      where: { class_id: dto.class_id },
    });

    if (!existingClass) {
      throw new NotFoundException(`Class with ID ${dto.class_id} not found`);
    }

    const existingFee = await this.feeStructureRepo.findOne({
      where: { class: { class_id: dto.class_id } },
    });

    if (existingFee) {
      throw new BadRequestException(
        `Fee structure already exists for this class`,
      );
    }

    const feeStructure = this.feeStructureRepo.create({
      total_amount: dto.total_amount,
      due_date: dto.due_date,
      class: existingClass,
    });

    try {
      return await this.feeStructureRepo.save(feeStructure);
    } catch (err) {
      throw new InternalServerErrorException('Failed to create fee structure');
    }
  }

  async findAll(): Promise<FeeStructure[]> {
    try {
      return await this.feeStructureRepo.find({ relations: ['class'] });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to find all feeStructures',
      );
    }
  }

  async findById(id: number): Promise<FeeStructure> {
    const fee = await this.feeStructureRepo.findOne({
      where: { fee_struct_id: id },
      relations: ['class'],
    });

    if (!fee) {
      throw new NotFoundException(`Fee structure with ID ${id} not found`);
    }

    return fee;
  }

  async remove(id: number) {
    try {
      const result = await this.feeStructureRepo.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Fee Structure With ID ${id} not found`);
      }
      return { message: 'Fee Strucure deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException(`Failed to delete fee Structure`);
    }
  }
}
