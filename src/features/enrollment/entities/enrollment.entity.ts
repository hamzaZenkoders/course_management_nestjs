import { Status } from "src/features/enums/enrollmentStatus";
import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Enrollment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date', default: () => 'CURRENT_DATE' })
    enrollmentDate: Date;

    @Column({
        type: "enum",
        enum: Status,
        default: Status.physical,
    })
    enrollmentStatus: Status;

    @Column({ type: 'date', default: () => 'CURRENT_DATE' })
    createdAt: Date;

    @Column({ type: 'date', default: () => 'CURRENT_DATE', onUpdate: 'CURRENT_DATE' })
    updatedAt: Date;
}
