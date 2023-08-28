import { sequelize } from "../config/database";
import { DataType } from "sequelize-typescript";
const Users = sequelize.define("Users", {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataType.STRING,
  },
  apellido: {
    type: DataType.STRING,
  },
  genero: {
    type: DataType.STRING,
  },
  estado: {
    type: DataType.STRING,
  },
  tipo_doc: {
    type: DataType.STRING,
  },
  doc: {
    type: DataType.STRING,
  },
  cargo: {
    type: DataType.STRING,
  },
  tipo_usuario: {
    type: DataType.STRING,
  },
  nivel_red: {
    type: DataType.STRING,
  },
  usuario: {
    type: DataType.STRING,
  },
  contraseña: {
    type: DataType.STRING,
  },
  anydesk_id: {
    type: DataType.STRING,
  },
  anydesk_contra: {
    type: DataType.STRING,
  },
  email_tip: {
    type: DataType.STRING,
  },
  email_dirrecion: {
    type: DataType.STRING,
  },
  email_contraseña: {
    type: DataType.STRING,
  },
  IdSucursal: {
    type: DataType.INTEGER,
  },
});
export default Users;
