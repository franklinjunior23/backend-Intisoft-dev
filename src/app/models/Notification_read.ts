import { sequelize } from "../config/database";
import { DataType } from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";

const Notifications_read = sequelize.define("notifications_reads", {
  id: {
    type: DataType.STRING,
    defaultValue: uuidv4,
    primaryKey: true,
  },
  Notification_id: {
    type: DataType.STRING,
   allowNull: false,
  },
  User_id: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  Read: {
    type: DataType.BOOLEAN,
    allowNull: false,
  },
});

export default Notifications_read;
