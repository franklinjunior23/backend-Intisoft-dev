import 'dotenv/config'

export const VARIABLES_ENVIROMENTS={
    DATABASE_NAME:process.env.DBNAME,
    DATABASE_PASSWORD:process.env.PASWORD,
    DATABASE_USER:process.env.USER,
    DATABASE_HOST:process.env.HOST,
    DATABASE_PORT:process.env.LOCAL,
    DATABASE_TYPE:process.env.DIALECT
}