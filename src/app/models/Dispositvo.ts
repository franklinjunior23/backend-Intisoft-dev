import { sequelize } from "../config/db/database";
import { Model } from "sequelize";
import { DataType, PrimaryKey } from "sequelize-typescript";

export interface DispositivoAttributes {
  id: number;
  Agent?: boolean;
  codigo_dispositivo?: string;
  nombre?: string;
  tipo?: string;
  tipo_Disp?: string;
  marca?: string;
  modelo?: string;
  serie?: string;
  tipo_con?: string;
  estado?: string;
  IdSucursal?: number;
  IdUser?: number | null; // Hacer 'IdUser' opcional
  date_created?: Date; // Hacer 'date_created' opcional
  deletedAt?: Date | null; // Hacer 'deletedAt' opcional
  notes?: any[] | null; // Hacer 'notes' opcional
}


class Dispositivo extends Model<DispositivoAttributes> {}

Dispositivo.init(
  {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Agent: {
      type: DataType.BOOLEAN,
    },
    codigo_dispositivo: {
      type: DataType.STRING,
    },
    nombre: {
      type: DataType.STRING,
    },
    tipo: {
      type: DataType.STRING,
    },
    tipo_Disp: {
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
    date_created: {
      type: DataType.DATE,
      defaultValue: DataType.NOW,
    },
    deletedAt: {
      type: DataType.DATE,
      allowNull: true,
      defaultValue: null,
    },
    notes: {
      type: DataType.JSON,
      defaultValue: null,
    },
    
  },

  {
    sequelize,
    paranoid: true,
    modelName:"Dispositivo",
    tableName: "Dispositivos",
    defaultScope: {
      attributes: { exclude: ["deletedAt"] },
    },
    
  }
);
export default Dispositivo;
