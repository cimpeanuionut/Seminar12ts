import db from '../dbConfig';
import Sequelize, { ModelDefined } from 'sequelize';

export interface AddressAttributes{
    AddressId: number,
    AddressDetail: string,
    AddressCity: string,
    EmployeeId: number
}

export interface AddressCreationAttributes extends AddressAttributes {}

const Address : ModelDefined<AddressAttributes, AddressCreationAttributes> = db.define("Address", 
{
    AddressId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    AddressDetail: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },

    AddressCity:
    {
        type: Sequelize.STRING,
        allowNull: false
    },

    EmployeeId: 
    {
        type: Sequelize.INTEGER,
        allowNull: false
    }   
});

export default Address;