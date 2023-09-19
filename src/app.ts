import express from 'express'
import cors from 'cors';
import 'dotenv/config'
import { sequelize } from './app/config/database';
import Login from './app/routes/Login.routes';
import { Execute_roles } from './app/seeds/RolesPredet.seed';
import swaggerUi from 'swagger-ui-express';
import specs from './docs/Swagger';
const app = express();
const puerto = process.env.PORT || 3000;
const point_defect = process.env.POINT || '/api/v1';
import "./app/models/Asociaciones"
import EmpresasRoutes from './app/routes/Empresas.routes';
import Sucursales_endpoint from './app/routes/Sucursales.routes';
import UserRoutes from './app/routes/Users.routes';
import DispostivoRoutes from './app/routes/Dispositivo.routes';
import informesRoutes from './app/routes/Informes.routes';
app.use(cors({
    origin:'*'
}))
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(`${point_defect}/auth/Login`,Login)
app.use(`${point_defect}/Empresas`,EmpresasRoutes)
app.use(`${point_defect}/Sucursales`,Sucursales_endpoint)
app.use(`${point_defect}/Users`,UserRoutes)
app.use(`${point_defect}/Dispositivos`,DispostivoRoutes)
app.use(`${point_defect}/Informes`,informesRoutes)



app.listen(puerto,async()=>{
   // Execute_roles() // ejecucion de la creacion de los roles por predeterminado
    // force: true 
    // alter: true
   // para tener cambios , actualizacion de la bd /
   await sequelize.sync(
  //  {alter: true}
);

    console.log(`http://localhost:${puerto}/api`)
})