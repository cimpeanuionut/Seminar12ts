import express from 'express';
import {createEmployee, getEmployeeById, getEmployees, deleteEmployee, updateEmployee} from "../dataAccess/employeeDA"
import employeeFilterDto from '../dataAccess/models/employeeFilterDto';

let employeeRouter = express.Router();
  
employeeRouter.route('/employee').post( async (req, res) => {
  return res.json(await createEmployee(req.body));
})

employeeRouter.route('/employee').get( async (req, res) => {  
  var queryParams = new employeeFilterDto(req.query) 
  return res.json(await getEmployees(queryParams));
})

employeeRouter.route('/employee/:id').get( async (req, res) => {
  let id = parseInt(req.params.id) 
  return res.json(await getEmployeeById(id));
})

employeeRouter.route('/employee/:id').delete( async (req, res) => {
  let id = parseInt(req.params.id) 
  return res.json(await deleteEmployee(id));
})

employeeRouter.route('/employee/:id').put( async (req, res) => {
  let id = parseInt(req.params.id) 
  return res.json(await updateEmployee(req.body, id));
})

export default employeeRouter;