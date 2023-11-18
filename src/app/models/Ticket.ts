import { sequelize } from "../config/database";
import { DataType } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { Sucursales ,Empresa, Users } from "./index";

const Tikets = sequelize.define("tikets", {
  id: {
    type: DataType.STRING,
    defaultValue: uuidv4,
    primaryKey: true,
  },
  Titulo: {
    type: DataType.STRING,
  },
  Fecha: {
    type: DataType.STRING,
  },
  Hora: {
    type: DataType.STRING,
  },
  Descripcion: {
    type: DataType.TEXT,
  },
  Estado: {
    type: DataType.STRING,
  },
  Nivel: {
    type: DataType.STRING,
  },
  Prioridad: {
    type: DataType.STRING,
  },
  UsuarioId: {
    type: DataType.INTEGER,
  },
  SucursalId: {
    type: DataType.INTEGER,
    references: {
      model: Sucursales,
      key: "id",
    },
  },
  EmpresaId: {
    type: DataType.INTEGER,
    references: {
        model: Empresa,
        key: "id",
      },
  },
  TypeItem: {
    type: DataType.STRING,
  },
  ItemId: {
    type: DataType.INTEGER,
    references:{
        model:Users,
        key:"id"
    }
  },
});
export default Tikets;
