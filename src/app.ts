import express from 'express'
import cors from 'cors';
import 'dotenv/config'
import { sequelize } from './app/config/database';
import Login from './app/routes/Login.routes';
const app = express();
const puerto = process.env.PORT || 3000;
const point_defect = process.env.POINT || '/api/v1';

app.use(cors({
    origin:'*'
}))
app.use(express.json());
app.use(`${point_defect}/auth/Login`,Login)

app.listen(puerto,async()=>{

    // force: true 
    // alter: true
   // para tener cambios , actualizacion de la bd /
    await sequelize.sync(
        {alter: true}
    );
    console.log(`http://localhost:${puerto}/api`)
})

console.log("hola funciono")