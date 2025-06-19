
import { SetMetadata } from '@nestjs/common';
import { StaffRole } from 'src/staff/constants/const';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: StaffRole[]) => SetMetadata(ROLES_KEY, roles);
