import { Course } from "src/features/course/entities/course.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Roles } from "../../enums/roles";

@Entity()
export class Teacher {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({type: 'varchar'})
    name:string;
   
    @Column({unique: true})
    email:string;
    
    @Column({type:'varchar'})
    address: string;

    @Column({type:'varchar'})
    contact: string;
      
    @Column({type:'varchar'})
    designation: string;

    @Column({type: 'varchar'})
    password:string;

    @Column({
        type: "enum",
        enum: Roles,
        default: Roles.teacher,
    })
    role: Roles;

    @Column({ type: 'date', default: () => 'CURRENT_DATE' })
    createdAt: Date;

    @Column({ type: 'date', default: () => 'CURRENT_DATE', onUpdate: 'CURRENT_DATE' })
    updatedAt: Date;

    @OneToMany(() => Course, course => course.teacher)
    courses: Course[];
}
