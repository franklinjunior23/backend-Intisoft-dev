import express from "express";
import cors from "cors";
import "./app/models/Asociaciones";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import handleSocketFunctions from "./app/utils/SocketIo";
import specs from "./docs/Swagger";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import RoutesExpress from "./routes";
import getEmailsToUpdate from "./app/utils/Email/EmailBind";
import { ExecuteUserCreateDefect } from "./app/seeds/UserDefect";
import { sequelize } from "./app/config/database";

import { ExecuteRoles } from "./app/seeds/RolesPredet.seed";

const app = express();

const server = require("http").Server(app);
export const io = new Server(server, { cors: { origin: "*" } });
const puerto = process.env.PORT || 3000;
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173",true],
  })
);
app.use(express.json());
app.use(cookieParser());



// documentacion for Swagger Ui
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.static("public"));

/**
 * Routes More
 * Different Routes of Express for the aplicacion
 *
 * */
app.use(RoutesExpress);

io.on("connection", handleSocketFunctions);
server.listen(puerto, async () => {
  
  
  // ExecuteRoles(); // ejecucion de la creacion de los roles por predeterminado
  // ExecuteUserCreateDefect();
  // await getEmailsToUpdate() // Ejecucion de guardar todos los datos en el campo email de la tabla Users
    // force: true
    // alter: true
  // para tener cambios , actualizacion de la bd /
  //await sequelize.sync({ alter: true });

  console.log(`http://localhost:${puerto}`);
});
