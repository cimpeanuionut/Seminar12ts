import Employee, { EmployeeCreationAttributes } from "../entities/Employee";
import Address from "../entities/Address";
import { Addresses } from "../entities/dbConst";
import { Like } from "./operators";
import employeeFilterDto from "./models/employeeFilterDto";
import db from "../dbConfig";

async function createEmployee(employee: EmployeeCreationAttributes) {
  return await Employee.create(employee, { include: [{ model: Address, as: Addresses }] });
}

async function getEmployees(employeeFilter: employeeFilterDto) {

  if (!employeeFilter.take)
    employeeFilter.take = 10;

  if (!employeeFilter.skip)
    employeeFilter.skip = 0;

  let whereClause: any = {};
  if (employeeFilter.employeeName)
    whereClause.EmployeeName = { [Like]: `%${employeeFilter.employeeName}%` };

  if (employeeFilter.employeeSurName)
    whereClause.EmployeeSurName = { [Like]: `%${employeeFilter.employeeSurName}%` };

  return await Employee.findAndCountAll(
    {
      distinct: true,
      where: whereClause,
      limit: employeeFilter.take,
      offset: employeeFilter.skip * employeeFilter.take,
    });

}

async function getEmployeeById(id: number) {
  return await Employee.findByPk(id, { include: [Addresses] });
}

async function deleteEmployee(id: number) {
  let deleteElem = await Employee.findByPk(id);

  if (!deleteElem) {
    console.log("This element does not exist, so it cannot be deleted");
    return;
  }
  return await deleteElem.destroy();
}

async function updateEmployee(employee: EmployeeCreationAttributes, id: number) {
  const findEmployee = await getEmployeeById(employee.EmployeeId);

  if (!findEmployee) {
    console.log("This employee does not exist");
    return;
  }

  const t = await db.transaction()
  try {
    await findEmployee.update(employee);

    // deleted
    const existAddress = await Address.findAll({
      where: {
        EmployeeId: employee.EmployeeId,
      },
    });

    if (existAddress.length > 0) {
      let addressIds = existAddress.map(a => a.dataValues.AddressId);
      let addressIdsDeleted = addressIds.filter(id => !employee.Addresses.find(add => add.AddressId === id)?.AddressId)
      if (addressIdsDeleted.length > 0)
        await Address.destroy({
          where: {
            AddressId: addressIdsDeleted,
          },
        })
    }

    // inserted 
    const insertedA = employee.Addresses.filter(a => a.AddressId === 0)
    if (insertedA.length > 0)
      await Address.bulkCreate(insertedA)

    // updated
    const updatedA = employee.Addresses.filter(a => a.AddressId !== 0);
    if (updatedA.length > 0) {
      for (let item of updatedA) {
        const findA = await Address.findByPk(item.AddressId);
        await findA?.update(item);
      }
    }

    await t.commit();

  } catch (e) {
    await t.rollback();
    throw e;
  }
}

export {
  createEmployee,
  getEmployeeById,
  getEmployees,
  deleteEmployee,
  updateEmployee
}