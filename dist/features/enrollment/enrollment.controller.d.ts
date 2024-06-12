import { EnrollmentService } from './enrollment.service';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { CreateEnrollmentDto } from './dto/create-enrollment-dto';
export declare class EnrollmentController {
    private readonly enrollmentService;
    constructor(enrollmentService: EnrollmentService);
    findAll(): string;
    create(createEnrollmentDto: CreateEnrollmentDto): Promise<import("./entities/enrollment.entity").Enrollment>;
    findOne(id: string): string;
    update(id: string, updateEnrollmentDto: UpdateEnrollmentDto): string;
    remove(id: string): string;
}
