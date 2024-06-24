import { Roles } from 'src/features/enums/roles';
export declare class CreateAdminDto {
    name: string;
    email: string;
    password: string;
    role: Roles;
}
