import express from "express";
import cors from "cors";
import "./app/models/Asociaciones";
import "dotenv/config";
import { sequelize } from "./app/config/database";
import Login from "./app/routes/Login.routes";
import { ExecuteRoles } from "./app/seeds/RolesPredet.seed";
import swaggerUi from "swagger-ui-express";
import specs from "./docs/Swagger";
import { Server } from "socket.io";
import EmpresasRoutes from "./app/routes/Empresas.routes";
import Sucursales_endpoint from "./app/routes/Sucursales.routes";
import UserRoutes from "./app/routes/Users.routes";
import DispostivoRoutes from "./app/routes/Dispositivo.routes";
import informesRoutes from "./app/routes/Informes.routes";
import TicketsRoutes from "./app/routes/Tickets.routes";
import BaseConocimientos from "./app/routes/BaseConocimientos.routes";
import { ExecuteUserCreateDefect } from "./app/seeds/UserDefect";
import cookieParser from "cookie-parser";
import SystemInfo from "./app/routes/SystemInfo.routes";
import Notify_Routes from "./app/routes/Notification.routes";
import handleSocketFunctions from "./app/utils/SocketIo";
import Notifications_Routes from "./app/routes/Notifications/Notifications.routes";
import getEmailsToUpdate from "./app/utils/Email/EmailBind";



const app = express();

const server = require("http").Server(app);
export const io = new Server(server, { cors: { origin: "*" } });
const puerto = process.env.PORT || 3000;
const point_defect = process.env.POINT || "/api/v1";
app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieParser());
app.use(express.json());
// documentacion for Swagger Ui
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.static("public"));
// RouteS
app.use(`${point_defect}/auth/Login`, Login);
app.use(`${point_defect}/Empresas`, EmpresasRoutes);
app.use(`${point_defect}/Sucursales`, Sucursales_endpoint);
app.use(`${point_defect}/Users`, UserRoutes);
app.use(`${point_defect}/Dispositivos`, DispostivoRoutes);
app.use(`${point_defect}/Informes`, informesRoutes);
app.use(`${point_defect}/Tickets`, TicketsRoutes);
app.use(`${point_defect}/BaseConocimiento`, BaseConocimientos);
app.use(`${point_defect}/Notification`, Notify_Routes);
app.use(`${point_defect}/SystemApi`, SystemInfo);
app.use(`${point_defect}/Notifications`, Notifications_Routes);

io.on("connection", handleSocketFunctions);
server.listen(puerto, async () => {
  // ExecuteRoles(); // ejecucion de la creacion de los roles por predeterminado
  // ExecuteUserCreateDefect();
  // await getEmailsToUpdate() // Ejecucion de guardar todos los datos en el campo email de la tabla Users
  // force: true
  // alter: true
  // para tener cambios , actualizacion de la bd /
  // await sequelize.sync({ alter: true });

  console.log(`http://localhost:${puerto}`);
});
