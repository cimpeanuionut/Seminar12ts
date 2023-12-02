import { ChangeEvent, useState } from "react"
import { Employee } from "../models/Employee"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from "react-router-dom";
import { post } from "../api/Calls";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Address } from "../models/Address";
import _ from 'lodash';
import EditIcon from '@mui/icons-material/Edit';

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

    const [address, setAddress] = useState<Address>({
        AddressId: 0,
        AddressCity: "",
        AddressDetail: "",
        EmployeeId: 0
    })

    const navigation = useNavigate();

    const [isNewAddress, setIsNewAddress] = useState<boolean>(true);
    const [addressIndex, setAddressIndex] = useState<number>(0);

    function onChangeEmployee(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();

        if (e.target.name === "EmployeeAge")
            e.target.value = e.target.value.replace(/[^0-9]/g, '');

        setEmployee({ ...employee, [e.target.name]: e.target.value });
    }

    async function saveEmployee() {
        await post("/employee", employee);
        navigation("/Employee");
    }

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setAddress({ 
            AddressId: 0,
            AddressCity: "",
            AddressDetail: "",
            EmployeeId: 0
        })
        setIsNewAddress(true)
    };

    const handleClose = () => {
        setOpen(false);
    };

    function saveAddress(){
        handleClose();
        if (isNewAddress)
        {
            const newAddress = _.cloneDeep(employee.Addresses);
            newAddress.push(address);
            setEmployee({...employee, Addresses: newAddress});
        }
        else
        {
            let newAddress = _.cloneDeep(employee.Addresses);
            newAddress = newAddress.map((a, index) => (index === addressIndex ? address : a));
            setEmployee({...employee, Addresses: newAddress});
        }   
    }

    function onChangeAddress(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setAddress({ ...address, [e.target.name]: e.target.value });
    }

    function deleteAddress(index: number){
        const newAddress = _.cloneDeep(employee.Addresses)
        newAddress.splice(index, 1);
        setEmployee({...employee, Addresses: newAddress});
    }

    function editAddress(index: number){
        setOpen(true);
        const currentAddress = employee.Addresses[index];
        setAddress(currentAddress);
        setIsNewAddress(false);
        setAddressIndex(index);
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

            <div>
                <h1>Employee Addresses</h1>

                <div>
                    <Button
                        startIcon={<AddCircleIcon />}
                        variant="contained"
                        onClick={handleClickOpen}
                    >
                        Add new address
                    </Button>

                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Employee Address</DialogTitle>
                        <DialogContent>
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                }}
                                noValidate
                            >
                                <TextField
                                    label="AddressCity"
                                    value={address.AddressCity}
                                    onChange={onChangeAddress}
                                    name="AddressCity"
                                />
                                <TextField
                                    label="AddressDetail"
                                    value={address.AddressDetail}
                                    onChange={onChangeAddress}
                                    name="AddressDetail"
                                />
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={saveAddress}>Save</Button>
                        </DialogActions>
                    </Dialog>
                </div>

                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Address City</TableCell>
                                <TableCell>Address Details</TableCell>
                                <TableCell>Edit</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employee.Addresses.map((row, index) => (
                                <TableRow key={index} >
                                    <TableCell>{row.AddressCity}</TableCell>
                                    <TableCell>{row.AddressDetail}</TableCell>
                                    <TableCell><Button startIcon={<EditIcon/>} color="success" onClick={() => editAddress(index)}/></TableCell>
                                    <TableCell><Button startIcon={<CancelIcon/>} color="error" onClick={() => deleteAddress(index)} /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Box>
    );
}