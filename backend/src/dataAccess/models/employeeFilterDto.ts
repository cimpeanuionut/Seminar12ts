import paginationDto from "./paginationDto";

export default class employeeFilterDto extends paginationDto{
    employeeName!: string | null
    employeeSurName!: string | null  

    constructor(obj : Partial<employeeFilterDto>){
        super();        
        Object.assign(this, obj);
        this.setTakeAndSkip(this.take, this.skip)       
    }
}