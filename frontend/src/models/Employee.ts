import { Address } from "./Address"

export interface Employee{
    EmployeeId : number,
    EmployeeName: string,
    EmployeeSurName: string,
    EmployeeAge: number,
    EmployeeOccupation: string,
    EmployeePhone: string | null,
    EmployeeEmail: string | null,
    Addresses: Address[]   
}