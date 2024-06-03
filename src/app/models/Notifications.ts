import { sequelize } from "../config/database";
import { DataType } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";

const Notifications = sequelize.define("notifications", {
  id: {
    type: DataType.STRING,
    defaultValue: uuidv4,
    primaryKey: true,
  },
  UserAction: {
    type: DataType.STRING,
    allowNull: false,
  },
  Message: {
    type: DataType.STRING,
    allowNull: false,
  },
  Hora: {
    type: DataType.STRING,
    allowNull: false,
  },
});

export default Notifications;
