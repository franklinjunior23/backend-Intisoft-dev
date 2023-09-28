import { sequelize } from "../config/database";
import { DataType } from "sequelize-typescript";
import { v4 as uuidv4 } from 'uuid';

const SuportDocs = sequelize.define('suportDocs',{
    id:{
        type: DataType.UUID,
        defaultValue: uuidv4,
        primaryKey: true
    },
    Titulo:{
        type: DataType.STRING,
    },
    Contenido:{
        type: DataType.TEXT,
    },
    Categoria:{
        type: DataType.STRING,
    },
    Comentarios:{
        type: DataType.JSON,
    },
    Autor:{
        type: DataType.STRING,
    },
    Calificacion:{
        type: DataType.INTEGER,
    },
})

export default SuportDocs;