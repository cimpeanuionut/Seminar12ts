import { ChangeEvent, useEffect, useState } from "react";
import { get, remove } from "../api/Calls";
import { Employee } from "../models/Employee";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePaginationActions from "../components/TablePaginationActions";
import { PaginationResponse } from "../models/PaginationResponse";
import { Box, Button, TableHead, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { EmployeeFilterDto } from "../models/EmployeeFilterDto";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ClearIcon from '@mui/icons-material/Clear';
import _ from "lodash";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';

export default function EmployeesList() {

  const [employees, setEmployees] = useState<PaginationResponse<Employee>>({ count: 0, rows: [] })
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0)
  const [employeeFilter, setEmployeeFilter] = useState<EmployeeFilterDto>({
    employeeName: "",
    employeeSurName: "",
    take: 5,
    skip: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    getEmployees(employeeFilter).then(d => { setEmployees(d); })
  }, [])

  async function getEmployees(employeeFilter: EmployeeFilterDto) {
    return (await get("/employee", employeeFilter)) as PaginationResponse<Employee>;
  }

  const handleChangePage = async (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
    let newFilter = _.cloneDeep(employeeFilter);
    newFilter.skip = newPage;
    await filter(newFilter);
    setEmployeeFilter(newFilter);
  };

  const handleChangeRowsPerPage = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let take = parseInt(event.target.value, 10)
    setRowsPerPage(take);
    setPage(0);

    let newFilter = _.cloneDeep(employeeFilter);
    newFilter.take = take;
    newFilter.skip = 0;
    await filter(newFilter);
    setEmployeeFilter(newFilter);
  };

  function newEmployee() {
    navigate("/NewEmployee")
  }

  function onChangeFilter(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setEmployeeFilter({ ...employeeFilter, [e.target.name]: e.target.value });
  }

  async function filterEmployee() {
    setPage(0)
    let empFilter = _.cloneDeep(employeeFilter);
    empFilter.skip = 0
    filter(empFilter)
  }

  async function clearFilters() {
    let newFilter = { employeeName: "", employeeSurName: "", skip: 0, take: 5 };
    setPage(0)
    setRowsPerPage(5);
    setEmployeeFilter(newFilter);
    filter(newFilter)
  }

  async function filter(filter: EmployeeFilterDto) {
    let filterEmployees = await getEmployees(filter);
    setEmployees(filterEmployees);
  }

  async function deleteEmployee(employeeId: number){
    await remove("/employee", employeeId);
    let ret = await getEmployees(employeeFilter);
    setEmployees(ret);
  }

  return (
    <div>

      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        style={{ marginBottom: '30px' }}
      >

        <h1>Filters</h1>
        <div>

          <TextField
            label="employeeName"
            value={employeeFilter.employeeName}
            onChange={onChangeFilter}
            name="employeeName"
          />

          <TextField
            label="employeeSurName"
            value={employeeFilter.employeeSurName}
            onChange={onChangeFilter}
            name="employeeSurName"
          />

        </div>

        <div>
          <Button style={{ marginRight: '8px' }} startIcon={<FilterAltIcon />} variant="contained" onClick={filterEmployee}>
            Filter
          </Button>

          <Button startIcon={<ClearIcon />} variant="contained" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>

      </Box>

      <Button style={{ marginBottom: '20px' }} startIcon={<AddCircleIcon />} variant="contained" onClick={newEmployee}>New Employee</Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Employee Name</TableCell>
              <TableCell>Employee SurName</TableCell>
              <TableCell>Employee Age</TableCell>
              <TableCell>Employee Occupation</TableCell>
              <TableCell>Employee Phone</TableCell>
              <TableCell>Employee Email</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.rows.map((row) => (
              <TableRow key={row.EmployeeId}>
                <TableCell align="left">
                  {row.EmployeeName}
                </TableCell>
                <TableCell align="left">
                  {row.EmployeeSurName}
                </TableCell>
                <TableCell align="left">
                  {row.EmployeeAge}
                </TableCell>
                <TableCell align="left">
                  {row.EmployeeOccupation}
                </TableCell>
                <TableCell align="left">
                  {row.EmployeePhone}
                </TableCell>
                <TableCell align="left">
                  {row.EmployeeEmail}
                </TableCell>
                <TableCell>
                  <Button
                    startIcon={<EditIcon />}
                    color="success"
                  />
                </TableCell>
                <TableCell>
                  <Button 
                    startIcon={<CancelIcon />}
                    color="error"
                    onClick={() => deleteEmployee(row.EmployeeId)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={employees.count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}