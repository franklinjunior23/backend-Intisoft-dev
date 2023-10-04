import express from "express";
import cors from "cors";
import "dotenv/config";
import { sequelize } from "./app/config/database";
import Login from "./app/routes/Login.routes";
import { ExecuteRoles } from "./app/seeds/RolesPredet.seed";
import swaggerUi from "swagger-ui-express";
import specs from "./docs/Swagger";
const app = express();
const puerto = process.env.PORT || 3000;
const point_defect = process.env.POINT || "/api/v1";
import "./app/models/Asociaciones";
import EmpresasRoutes from "./app/routes/Empresas.routes";
import Sucursales_endpoint from "./app/routes/Sucursales.routes";
import UserRoutes from "./app/routes/Users.routes";
import DispostivoRoutes from "./app/routes/Dispositivo.routes";
import informesRoutes from "./app/routes/Informes.routes";
import TicketsRoutes from "./app/routes/Tickets.routes";
import BaseConocimientos from "./app/routes/BaseConocimientos.routes";
import { ExecuteUserCreateDefect } from "./app/seeds/UserDefect";

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
// documentacion for Swagger Ui
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.static('public'))
// RouteS
app.use(`${point_defect}/auth/Login`, Login);
app.use(`${point_defect}/Empresas`, EmpresasRoutes);
app.use(`${point_defect}/Sucursales`, Sucursales_endpoint);
app.use(`${point_defect}/Users`, UserRoutes);
app.use(`${point_defect}/Dispositivos`, DispostivoRoutes);
app.use(`${point_defect}/Informes`, informesRoutes);
app.use(`${point_defect}/Tickets`, TicketsRoutes);
app.use(`${point_defect}/BaseConocimiento`, BaseConocimientos);


app.listen(puerto, async () => {
    ExecuteRoles(); // ejecucion de la creacion de los roles por predeterminado
    ExecuteUserCreateDefect()
    
  // force: true
  // alter: true
  // para tener cambios , actualizacion de la bd /
  await sequelize.sync(/*{ alter: true }*/);

  console.log(`http://localhost:${puerto}/api`);
});
