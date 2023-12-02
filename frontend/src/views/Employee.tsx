import { useEffect, useState } from "react";
import { get } from "../api/Calls";
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
import { Button, TableHead } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function EmployeesList() {

  const [employees, setEmployees] = useState<PaginationResponse<Employee>>({ count: 0, rows: [] })
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    getEmployees().then(d => { setEmployees(d); })
  }, [])

  async function getEmployees() {
    return (await get("/employee")) as PaginationResponse<Employee>;
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employees.rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function newEmployee(){
    navigate("/NewEmployee")
  }

  return (
    <div>    

      <Button startIcon={<AddCircleIcon/>} variant="contained" onClick={newEmployee}>New Employee</Button>   

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Employee Name</TableCell>
              <TableCell>Employee SurName</TableCell>
              <TableCell>Employee Age</TableCell>
              <TableCell>Employee Occupation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? employees.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : employees.rows
            ).map((row) => (
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
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
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