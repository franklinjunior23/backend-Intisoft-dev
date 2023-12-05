import { sequelize } from "../config/database";
import { DataType } from "sequelize-typescript";
import { v4 as uuidv4 } from 'uuid';
const Administradores = sequelize.define('Administradores',{
    // ID DEL USUARIO
    id:{
        type:DataType.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    // NOMBRE DEL USUARIO
    nombre:{
        type:DataType.STRING,
        allowNull:false
    },
    // APELLIDO DEL USUARIO
    apellido:{
        type:DataType.STRING,
        allowNull:false
    },
    // CORREO DEL USUARIO
    correo:{
        type:DataType.STRING
    },
    // USUARIO DEL USUARIO
    usuario:{
        type:DataType.STRING,
        allowNull:false
    },
    // CONTRASEÑA DEL USUARIO
    contraseña:{
        type:DataType.STRING,
        allowNull:false
    },
    // ID RROL DEL USUARIO
    id_rol:{
        type:DataType.INTEGER,
        allowNull:false
    },
    // ESTADO DEL USUARIO BLOQUEADO O NO
    isBlocked:{
        type:DataType.BOOLEAN,  
    },
    // FECHA DEL BLOQUEO DEL USUARIO
    lock_date:{
        type:DataType.STRING,
    },
    // FECHA DEL ULTIMO LOGIN DEL USUARIO
    login_attempts:{
        type:DataType.INTEGER,
    },
    // FECHA DEL ULTIMO LOGIN DEL USUARIO
    last_login_attempt:{
        type:DataType.STRING,
    },
    isActive:{
        type:DataType.BOOLEAN,  
    }
    
    
    
})


export default Administradores;