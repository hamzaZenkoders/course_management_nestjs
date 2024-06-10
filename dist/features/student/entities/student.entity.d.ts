import { Roles } from 'src/features/enums/roles';
import { whiteListDomain } from 'src/core/entities/whitlistedDomain.entity';
import { OTP } from 'src/core/entities/otp.entity';
export declare class Student {
    id: number;
    name: string;
    email: string;
    password: string;
    age: number;
    address: string;
    contact: string;
    dateOfBirth: Date;
    role: Roles;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    domainID: whiteListDomain;
    otps: OTP[];
}
