import { sequelize } from "app/config/database";
import { DataType } from "sequelize-typescript";
import { v4 as uuidv4 } from 'uuid';
const Roles = sequelize.define('Roles',{
    id:{
        type:DataType.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombre:{
        type:DataType.STRING,
    },
    
})

export default Roles;