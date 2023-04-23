// src/auth/roles.decorator.ts

import { SetMetadata } from '@nestjs/common';
import { UserRole } from './role.enum';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
