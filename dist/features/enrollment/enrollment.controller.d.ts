import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment-dto';
export declare class EnrollmentController {
    private readonly enrollmentService;
    constructor(enrollmentService: EnrollmentService);
    findAll(): string;
    create(createEnrollmentDto: CreateEnrollmentDto): Promise<import("./entities/enrollment.entity").Enrollment>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    findOneEnrollment(id: string): Promise<import("./entities/enrollment.entity").Enrollment>;
}
