import express from 'express'
import cors from 'cors';
import 'dotenv/config'
import { sequelize } from './app/config/database';
import Login from './app/routes/Login.routes';
import { Execute_roles } from './app/seeds/RolesPredet.seed';
const app = express();
const puerto = process.env.PORT || 3000;
const point_defect = process.env.POINT || '/api/v1';
import "./app/models/Asociaciones"
import EmpresasRoutes from './app/routes/Empresas.routes';
import Sucursales_endpoint from './app/routes/Sucursales.routes';
import UserRoutes from './app/routes/Users.routes';
app.use(cors({
    origin:'*'
}))
app.use(express.json());
app.use(`${point_defect}/auth/Login`,Login)
app.use(`${point_defect}/Empresas`,EmpresasRoutes)
app.use(`${point_defect}/Sucursales`,Sucursales_endpoint)
app.use(`${point_defect}/Users`,UserRoutes)

app.listen(puerto,async()=>{
    
    // force: true 
    // alter: true
   // para tener cambios , actualizacion de la bd /
   await sequelize.sync(
    {alter: true}
);

    console.log(`http://localhost:${puerto}/api`)
})