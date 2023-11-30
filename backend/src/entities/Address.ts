import db from '../dbConfig';
import Sequelize from 'sequelize';

const Address = db.define("Address", 
{
    AdresaId:
    {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    AdresaDetail: 
    {
        type: Sequelize.STRING,
        allowNull: false
    },

    City:
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