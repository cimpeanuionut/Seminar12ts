import Employee, { EmployeeCreationAttributes } from "../entities/Employee";
import Address from "../entities/Address";
import { Addresses } from "../entities/dbConst";
import { Like } from "./operators";
import employeeFilterDto from "./models/employeeFilterDto";

async function createEmployee(employee: EmployeeCreationAttributes) {  
    return await Employee.create(employee, {include: [{model: Address, as: Addresses}]});
  }

async function getEmployees(employeeFilter: employeeFilterDto){ 
   
  if (!employeeFilter.take)
    employeeFilter.take = 10;

  if (!employeeFilter.skip)
    employeeFilter.skip = 1;      

  let whereClause : any = {};
  if (employeeFilter.employeeName)
      whereClause.EmployeeName = {[Like]: `%${employeeFilter.employeeName}%`};

  if (employeeFilter.employeeSurName)
    whereClause.EmployeeSurName = {[Like]: `%${employeeFilter.employeeSurName}%`};

  let whereAddressClause : any = {};

  if (employeeFilter.addressCity)
    whereAddressClause.AddressCity = {[Like]: `%${employeeFilter.addressCity}%`};   

  return await Employee.findAndCountAll (
    {   
      distinct: true,         
      include:
      [
        {
          model: Address,
          as: Addresses,
          ...(Object.keys(whereAddressClause).length > 0 && { where: whereAddressClause }),
          required: Object.keys(whereAddressClause).length > 0,
        }
      ],
      where: whereClause,
      limit: parseInt(employeeFilter.take.toString()),
      offset: (employeeFilter.skip - 1) * employeeFilter.take, // skip este pagina curenta iar take sunt cate inregistrari vin pe pagina
    });

  }
  
async function getEmployeeById(id: number){
    return await Employee.findByPk(id, {include: [Addresses]});
  }

export {
  createEmployee,
  getEmployeeById,
  getEmployees
}