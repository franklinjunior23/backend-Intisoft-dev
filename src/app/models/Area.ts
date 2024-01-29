import { sequelize } from "../config/database";
import { DataType } from "sequelize-typescript";

const Area = sequelize.define(
  "Areas",
  {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
    },
    deletedAt: {
      type: DataType.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  //Config Defaults
  {
    paranoid: true,
    defaultScope: {
        attributes: { exclude: ['deletedAt'] },
       
      },
  }
);
export default Area;
