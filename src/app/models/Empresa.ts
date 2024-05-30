import { sequelize } from "../config/database";
import { DataType } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
const Empresa = sequelize.define(
  "Empresa",
  {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataType.STRING,
    },
    razon_social: {
      type: DataType.STRING,
    },
    lugar: {
      type: DataType.STRING,
    },
    deletedAt: {
      type: DataType.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    paranoid: true,
    defaultScope: {
      attributes: { exclude: ["deletedAt"] },
    },
  }
);

export default Empresa;
