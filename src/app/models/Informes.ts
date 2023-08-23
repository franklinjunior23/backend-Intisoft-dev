import { sequelize } from "../config/database";
import { DataType } from "sequelize-typescript";

const Informes = sequelize.define('Informe',{
    id:{
        type:DataType.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    IdDispositivo:{
        type:DataType.INTEGER,
    },
    fecha:{
        type:DataType.STRING
    },
    accion:{
        type:DataType.STRING
    },
    observacion:{
        type:DataType.STRING
    }
    
})


export default Informes;