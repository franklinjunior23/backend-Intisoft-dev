import { Sequelize } from "sequelize";
import "dotenv/config";

console.log(process.env.DBPORT); 
export const sequelize = new Sequelize(
  process.env.DBNAME || "",
  process.env.DBUSER || "",
  process.env.DBPASSWORD|| "",  
  {
    host: "localhost",
    port: Number(process.env.DBPORT) || 3306,
    dialect: "mysql",
    logging:
      false /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
  }
);

export const Connection = async () => {
  try {
    await sequelize.sync();
  } catch (error) {
    console.log(error);
  }
};
