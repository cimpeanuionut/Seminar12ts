import { PaginationDto } from "./PaginationDto";

export interface EmployeeFilterDto extends PaginationDto{
    employeeName: string
    employeeSurName: string
}