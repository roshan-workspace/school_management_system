import { PartialType } from '@nestjs/mapped-types';
import { CreateSectionSubjectDto } from './create-section-subject.dto';

export class UpdateSectionSubjectDto extends PartialType(CreateSectionSubjectDto) {}
