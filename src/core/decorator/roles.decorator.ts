import { SetMetadata } from '@nestjs/common';
//import { Role } from '../enums/role.enum';

export const ROLES_KEY = 'role';
export const Role = (role: string) => SetMetadata(ROLES_KEY, role);
