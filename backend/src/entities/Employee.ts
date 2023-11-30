import db from '../dbConfig';
import Sequelize from 'sequelize';

const Employee = db.define("Employee", 
{
    EmployeeId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    EmployeeName: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },

    EmployeeSurName:
    {
        type: Sequelize.STRING,
        allowNull: false
    },

    EmployeeAge: 
    {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    EmployeeOccupation:
    {
        type: Sequelize.STRING,
        allowNull: false 
    },  
    
    EmployeePhone:
    {
        type: Sequelize.STRING,
        allowNull: true 
    },

    EmployeeEmail:
    {
        type: Sequelize.STRING,
        allowNull: true 
    }
});

export default Employee;