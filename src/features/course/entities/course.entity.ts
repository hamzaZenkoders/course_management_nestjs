import { Teacher } from "src/features/teacher/entities/teacher.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'varchar'})
    courseCode: string;

    @Column({type:'varchar'})
    description: string;

    @Column({type: 'varchar'})
    courseType: string; 

    @Column({ type: 'timestamp' }) 
    dropDeadline: Date;

    
    @Column({ type: 'date', default: () => 'CURRENT_DATE' })
    createdAt: Date;

    @Column({ type: 'date', default: () => 'CURRENT_DATE', onUpdate: 'CURRENT_DATE' })
    updatedAt: Date;

    @ManyToOne(() => Teacher, teacher => teacher.courses)
    teacher: Teacher;
}
