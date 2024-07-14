import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../enum/role.enum';

// Roles management
export const PERMITTED_ROLES_KEY = 'permitted_roles';
export const PermittedRoles = (...userRoles: UserRole[]) =>
  SetMetadata(PERMITTED_ROLES_KEY, userRoles);
