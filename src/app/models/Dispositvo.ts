import { sequelize } from "../config/database";
import { DataType } from "sequelize-typescript";

const Dispositivo = sequelize.define("Dispositivo", {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataType.STRING,
  },
  tipo: {
    type: DataType.STRING,
  },
  marca: {
    type: DataType.STRING,
  },
  modelo: {
    type: DataType.STRING,
  },
  serie: {
    type: DataType.STRING,
  },
  tipo_con: {
    type: DataType.STRING,
  },
  estado: {
    type: DataType.STRING,
  },
  IdSucursal: {
    type: DataType.INTEGER,
  },
  IdUser: {
    type: DataType.INTEGER,
  },
});
export default Dispositivo;

