import mysql from 'mysql2/promise.js'
import env from 'dotenv';
import Employee from './Employee';
import Address from './Address';
import { Addresses } from './dbConst';

env.config();

function createDatabase(){   
    mysql.createConnection({
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD
    })
    .then((connection) => {   
    return connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`)
    })    
    .catch((err) => {
    console.warn(err.stack)
    })
}

function fkConfig()
{
    Employee.hasMany(Address, {as : Addresses, foreignKey: "EmployeeId"});
    Address.belongsTo(Employee, { foreignKey: "EmployeeId"})    
}

function db_init(){
    createDatabase();
    fkConfig();    
}

export default db_init;