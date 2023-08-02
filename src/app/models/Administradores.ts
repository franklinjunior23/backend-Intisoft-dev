import { sequelize } from "../config/database";
import { DataType } from "sequelize-typescript";
import { v4 as uuidv4 } from 'uuid';
const Administradores = sequelize.define('Administradores',{
    id:{
        type:DataType.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombre:{
        type:DataType.STRING,
        allowNull:false
    },
    apellido:{
        type:DataType.STRING,
        allowNull:false
    },
    usuario:{
        type:DataType.STRING,
        allowNull:false
    },
    contraseña:{
        type:DataType.STRING,
        allowNull:false
    },
    id_rol:{
        type:DataType.INTEGER,
        allowNull:false
    }
    
})


export default Administradores;