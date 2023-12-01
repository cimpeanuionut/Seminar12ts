import paginationDto from "./paginationDto";

export default class employeeFilterDto extends paginationDto{
    employeeName!: string | null
    employeeSurName!: string | null
    addressCity!: string | null

    constructor(obj : Partial<employeeFilterDto>){
        super(obj);
        Object.assign(this, obj);
    }
}