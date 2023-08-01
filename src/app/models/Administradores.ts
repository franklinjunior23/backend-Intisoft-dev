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
    },
    apellido:{
        type:DataType.STRING
    },
    usuario:{
        type:DataType.STRING
    },
    contraseña:{
        type:DataType.STRING
    },
    id_rol:{
        type:DataType.INTEGER
    }
    
})

export default Administradores;