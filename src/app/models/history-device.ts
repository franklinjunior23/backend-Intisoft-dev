import { sequelize } from "../config/db/database";
import { DataType } from "sequelize-typescript";

const History_device = sequelize.define("HistoryDevice", {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  action: {
    type: DataType.JSON,
    allowNull: false,
  },
  device:{
    type: DataType.INTEGER,
  }
});

export default History_device;
