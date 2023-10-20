import { sequelize } from "../config/database";
import { v4 as uuidv4 } from "uuid";
import { DataType } from "sequelize-typescript";

const Sucursal = sequelize.define<any>("Sucursales", {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataType.STRING,
  },
  id_empresa: {
    type: DataType.INTEGER,
  },
  Token: {
    type: DataType.STRING,
    allowNull: false,
  },
});

export default Sucursal;
