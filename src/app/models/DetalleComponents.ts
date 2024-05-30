import { sequelize } from "../config/database";
import { DataType } from "sequelize-typescript";
const DetalleDispositivo = sequelize.define("DetalleDispositivo", {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  IdDispositivo: {
    type: DataType.INTEGER,
  },
  Config_mac: {
    type: DataType.STRING,
  },
  Config_ip: {
    type: DataType.STRING,
  },
  Config_user: {
    type: DataType.STRING,
  },
  Config_contra: {
    type: DataType.STRING,
  },
  Placa_modelo: {
    type: DataType.STRING,
  },
  Placa_detalle: {
    type: DataType.STRING,
  },
  Procesador_marca: {
    type: DataType.STRING,
  },
  Procesador_modelo: {
    type: DataType.STRING,
  },
  Ram_cantidad: {
    type: DataType.STRING,
  },
  Ram_Modulos: {
    type: DataType.JSON,
  },
  Almacenamiento_canti: {
    type: DataType.STRING,
  },
  Almacenamiento_detalle: {
    type: DataType.JSON,
  },
  Tarjeta_Video: {
    type: DataType.JSON,
  },
  Os: {
    type: DataType.JSON,
  },
  users:{
    type:DataType.JSON
  }
});
export default DetalleDispositivo;
