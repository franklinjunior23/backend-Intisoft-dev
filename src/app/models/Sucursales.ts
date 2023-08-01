import { sequelize } from "app/config/database";
import { DataType } from "sequelize-typescript";
import { v4 as uuidv4 } from 'uuid';
const Sucursal = sequelize.define('Sucursales',{
    id:{
        type:DataType.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombre:{
        type:DataType.STRING,
    },
    id_empresa:{
        type:DataType.INTEGER
    },
    
})

export default Sucursal;