import { useEffect, useState } from "react";
import {get} from "../api/Calls";
import { Employee } from "../models/Employee";

export default function EmployeesList(){

    const [employees, setEmployees] = useState<Employee[]>([])

    useEffect(() => {
        getEmployees().then(d => setEmployees(d))
    }, [])

    async function getEmployees(){
        return (await get("/employee")) as Employee[];        
    }

    return(
       <h1>Employee page</h1>
    )    
}