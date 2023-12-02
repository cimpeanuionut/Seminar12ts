import { ChangeEvent, useState } from "react"
import { Employee } from "../models/Employee"
import { Box, Button, TextField } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from "react-router-dom";
import {post} from "../api/Calls";

export default function EmployeeEdit() {
    const [employee, setEmployee] = useState<Employee>({
        EmployeeId: 0,
        EmployeeName: "",
        EmployeeSurName: "",
        EmployeeAge: 0,
        EmployeeOccupation: "",
        EmployeePhone: "",
        EmployeeEmail: "",
        Addresses: []
    })

    const navigation = useNavigate();

    function onChangeEmployee(e: ChangeEvent<HTMLInputElement>){
        e.preventDefault();

        if (e.target.name === "EmployeeAge")
            e.target.value = e.target.value.replace(/[^0-9]/g, '');        

        setEmployee({ ...employee, [e.target.name]: e.target.value });        
    }

    async function saveEmployee(){
        await post("/employee", employee);
        navigation("/Employee");
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
        >
            <div>
                <TextField
                    label="EmployeeName"                  
                    size="small"
                    value={employee.EmployeeName}
                    onChange={onChangeEmployee}
                    name="EmployeeName"
                />
                <TextField
                    label="EmployeeSurName"                  
                    size="small"
                    value={employee.EmployeeSurName}
                    onChange={onChangeEmployee}
                    name="EmployeeSurName"
                />
            </div>
            <div>
                <TextField
                    label="EmployeeAge"                 
                    size="small"
                    value={employee.EmployeeAge}
                    onChange={onChangeEmployee}
                    name="EmployeeAge"
                    inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                      }}
                />
                <TextField
                    label="EmployeeOccupation"                   
                    size="small"
                    value={employee.EmployeeOccupation}
                    onChange={onChangeEmployee}
                    name="EmployeeOccupation"
                />
            </div>
            <div>
                <TextField
                    label="EmployeePhone"                   
                    size="small"
                    value={employee.EmployeePhone}
                    onChange={onChangeEmployee}
                    name="EmployeePhone"
                />
                <TextField
                    label="EmployeeEmail"                   
                    size="small"
                    value={employee.EmployeeEmail}
                    onChange={onChangeEmployee}
                    name="EmployeeEmail"
                />
            </div>

            <div>
                <Button
                    startIcon={<SaveIcon />}
                    variant="contained"
                    color="success"
                    style={{ marginRight: '8px' }}
                    onClick={saveEmployee}
                >
                    Save
                </Button>
                <Button
                    startIcon={<CancelIcon />}
                    variant="contained"
                    color="error"
                    onClick={() => navigation(-1)}
                >
                    Cancel
                </Button>
            </div>
        </Box>
    );
}