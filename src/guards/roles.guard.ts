// src/auth/roles.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from './role.enum';
import { UserPermission } from './permissions.enum';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      return false;
    }

    const hasRole = () => requiredRoles.some((role) => user.roles?.includes(role));
    if (hasRole()) {
      return true;
    }

    const requiredPermissions = this.reflector.getAllAndOverride<UserPermission[]>('permissions', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredPermissions) {
      return false;
    }

    const hasPermission = () =>
      requiredPermissions.every((permission) => user.permissions?.includes(permission));
    return user && hasPermission();
  }
}
