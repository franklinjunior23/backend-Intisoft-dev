import {Sequelize} from "sequelize";
import {VARIABLES_ENVIROMENTS} from './Enviroment';

const {DATABASE_NAME,DATABASE_PASSWORD,DATABASE_USER,DATABASE_HOST,DATABASE_PORT,DATABASE_TYPE} = VARIABLES_ENVIROMENTS
export const sequelize = new Sequelize (DATABASE_NAME || '',DATABASE_USER || '', DATABASE_PASSWORD || '', {
    host: DATABASE_HOST||'',
    port: Number(DATABASE_PORT),
    dialect: 'mysql',  /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
   
});

 export const Connection =async()=>{
    try {
        await  sequelize.sync();
    } catch (error) {
        console.log(error)
    }
 }

 