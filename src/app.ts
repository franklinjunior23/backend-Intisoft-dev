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
import { sequelize } from "./app/config/database";
import { config } from "dotenv";
import fileUpload from "express-fileupload";
import jwt from "jsonwebtoken";
import errorMiddleware from "./app/config/error-server";

const app = express();

const env = process.env.NODE_ENV || "development";
config({
  path: `.env.${env}`,
});

const server = require("http").Server(app);
export const io = new Server(server, { cors: { origin: "*" } });
const puerto = process.env.PORT || 3000;
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", true],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    safeFileNames: true,
    useTempFiles: true,
    tempFileDir: __dirname + "/public/",
  })
);

// documentacion for Swagger Ui
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.static("public"));

/**
 * Routes More
 * Different Routes of Express for the aplicacion
 *
 * */
app.use(RoutesExpress);

// midleware SocketIO
io.use(async (socket: any, next) => {
  const token = socket.handshake.auth.token;
  if (!token) return next(new Error("No token"));
  else {
    const decoded: any = await jwt.verify(
      token,
      String(process.env.SECRET_KEY_JWT)
    );
    console.log(`User conect ${decoded.datos.nombre}`);
    if (decoded) {
      socket.userId = decoded?.datos?.id;
      return next();
    }
  }
  next(new Error("Not token"));
});
io.on("connection", handleSocketFunctions);
app.use(errorMiddleware);
server.listen(puerto, async () => {
  //   ExecuteRoles(); // ejecucion de la creacion de los roles por predeterminado
  //  ExecuteUserCreateDefect();
  // await getEmailsToUpdate() // Ejecucion de guardar todos los datos en el campo email de la tabla Users

  // force: true
  // alter: true
  // para tener cambios , actualizacion de la bd /

  await sequelize.sync({ alter: true });

  console.log(`http://localhost:${puerto}`);
});
