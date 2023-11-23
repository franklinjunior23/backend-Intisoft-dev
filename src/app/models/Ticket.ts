import { sequelize } from "../config/database";
import { DataType } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { Sucursales, Empresa, Users, Administradores } from "./index";

const Tikets = sequelize.define("tikets", {
  id: {
    type: DataType.STRING,
    defaultValue: uuidv4,
    primaryKey: true,
  },
  // Titulo del ticket
  Titulo: {
    type: DataType.STRING,
  },
  // Fecha del ticket
  Fecha: {
    type: DataType.STRING,
  },
  // Hora del ticket
  Hora: {
    type: DataType.STRING,
  },
  // Descripcion del ticket
  Descripcion: {
    type: DataType.TEXT,
  },
  // Estado del Ticket
  Estado: {
    type: DataType.STRING,
  },
  // Nivel del ticket
  Nivel: {
    type: DataType.STRING,
  },
  // Prioridad del ticket
  Prioridad: {
    type: DataType.STRING,
  },
  // Usuario que creo su id
  UsuarioId: {
    type: DataType.INTEGER,
  },
  // Id De La Sucursal
  SucursalId: {
    type: DataType.INTEGER,
    references: {
      model: Sucursales,
      key: "id",
    },
  },
  // Id De La Empresa
  EmpresaId: {
    type: DataType.INTEGER,
  },
  // Typo del Item -> Dispositivo, Usuario
  TypeItem: {
    type: DataType.STRING,
  },
  // Id del item (TypeItem)
  ItemId: {
    type: DataType.INTEGER,
  },
  // Id del Usuario que realizo el cambio
  UserUpdateId: {
    type: DataType.STRING,
  },
});
export default Tikets;
