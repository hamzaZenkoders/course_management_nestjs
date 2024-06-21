import { EnrollmentService } from './enrollment.service';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { CreateEnrollmentDto } from './dto/create-enrollment-dto';
export declare class EnrollmentController {
    private readonly enrollmentService;
    constructor(enrollmentService: EnrollmentService);
    findAll(): string;
    create(createEnrollmentDto: CreateEnrollmentDto): Promise<import("./entities/enrollment.entity").Enrollment>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    findOne(id: string): Promise<import("./entities/enrollment.entity").Enrollment>;
    update(id: string, updateEnrollmentDto: UpdateEnrollmentDto): string;
}
