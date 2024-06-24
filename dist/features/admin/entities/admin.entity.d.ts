import { OTP } from 'src/core/otp/entity/otp.entity';
import { Roles } from 'src/features/enums/roles';
export declare class Admin {
    id: number;
    name: string;
    email: string;
    password: string;
    role: Roles;
    is_Verified: boolean;
    otps: OTP[];
}
