import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { StaffRole } from 'src/staff/constants/const';
import { ROLES_KEY } from './roles.decorator';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean{
    const requiredRoles = this.reflector.getAllAndOverride<StaffRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
     if (!requiredRoles) {
      return true;
    }
     const { loginInfo } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => loginInfo?.role == role);
  }
}
