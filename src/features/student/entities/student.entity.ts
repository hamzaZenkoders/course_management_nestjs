import { whiteListDomain } from "src/core/whitelistedDomain.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Roles } from "src/features/enums/roles";
/* export enum StudentRole {
    admin = "ADMIN",
    teacher = "TEACHER",
    student = "STUDENT",
} */

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({type: 'varchar'})
    name:string;
   
    @Column({unique: true})
    email:string;

    @Column({type: 'varchar'})
    password:string;

    @Column({type: 'varchar'})
    age: number;

    @Column({type:'varchar'})
    address: string;

    @Column({type:'varchar'})
    contact: string;

    @Column({ type: 'timestamp' }) 
    dateOfBirth: Date;

    @Column({
        type: "enum",
        enum:Roles,
        default: Roles.student,
    })
    role: Roles

    @Column({ type: 'date', default: () => 'CURRENT_DATE' })
    createdAt: Date;

    @Column({ type: 'date', default: () => 'CURRENT_DATE', onUpdate: 'CURRENT_DATE' })
    updatedAt: Date;

    
    @OneToOne(()=>whiteListDomain)
    @JoinColumn()
    domainID: whiteListDomain;

}
