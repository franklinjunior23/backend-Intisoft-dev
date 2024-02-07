import { Sequelize } from "sequelize";
import dotenv from "dotenv";

const {
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_USER,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_TYPE,
} = process.env;
export const sequelize = new Sequelize(
  process.env.DBNAME || "inventario_roy",
  process.env.USER || "root",
  process.env.PASWORD || "franklin",
  {
    host: process.env.HOST || "",
    port: Number(process.env.PORT) || 3306,
    dialect:
      "mysql" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
    dialectOptions: {
      // timezone: "America/Lima" // Establecer la zona horaria predeterminada
    },
  
  }
);

export const Connection = async () => {
  try {
    await sequelize.sync();
  } catch (error) {
    console.log(error);
  }
};
