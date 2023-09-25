import { sequelize } from "../config/database";
import { DataType } from "sequelize-typescript";
import { v4 as uuidv4 } from 'uuid';
const Tikets = sequelize.define('tikets', {
    id:{
        type: DataType.STRING,
        defaultValue: uuidv4,
        primaryKey: true
    },
    Titulo:{
        type: DataType.STRING,
    },
    UsuarioId:{
        type: DataType.INTEGER,
    },
    Estado:{
        type: DataType.STRING,
    },
    Fecha:{
        type: DataType.STRING,
    },
    Observacion:{
        type: DataType.STRING,
    },
    SucursalId:{
        type: DataType.INTEGER,
    },
    Comentario:{
        type: DataType.JSON,
    },
    PcId:{
        type: DataType.INTEGER,
    }
 });
 export default Tikets;