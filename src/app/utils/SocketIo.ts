import { Socket } from "socket.io";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { Administradores, Notification_read, Notifications } from "../models";

interface MySocket extends Socket {
  userId?: string;
}
var id_user_conected = 0;
const token = process.env.SECRET_KEY_JWT;
const handleSocketFunctions = (socket: MySocket) => {
  socket.on("autenticarUsuario", async (userId) => {
    try {
      const decoded: any = await jwt.verify(
        userId,
        token || String(process.env.SECRET_KEY_JWT)
      ); // Reemplaza con tu secreto secreto

      // Verificar si el token es válido y obtener el ID del usuario
      if (!decoded?.datos?.id)
        return socket.emit("datosDesdeServidor", {
          error: true,
          message: "Error al autenticar usuario",
        });
      // Asociar el ID del usuario al socket
      // id_user_conected = decoded.datos.id;
      // await Administradores.update(
      //   { isActive: true },
      //   { where: { id: decoded.datos.id } }
      // );
      // Enviar datos al cliente
      const datos = await ObtenerNotification({ userId: decoded.datos.id });
      socket.emit("datosDesdeServidor", datos);
    } catch (error: any) {
      console.error("Error al autenticar usuario:", error.message);
      socket.emit("datosDesdeServidor", {
        error: true,
        message: "Error al autenticar usuario",
      });
      // Manejar el error, por ejemplo, cerrar la conexión
      socket.disconnect();
    }
  });

  // socket.on("disconnect", async () => {
  //   console.log("usuario desconectado");
  //   await Administradores.update(
  //     { isActive: false },
  //     { where: { id: id_user_conected } }
  //   );
  //   id_user_conected = 0;
  // });
};

export default handleSocketFunctions;

export async function EmitNotification(socket: MySocket) {
  const datos = await Notifications.findAll({
    include: [{ model: Notification_read, where: { User_id: socket.userId } }],
    order: [["createdAt", "DESC"]],
    limit: 10,
  });
  socket.emit("datosDesdeServidor", datos);
}

async function ObtenerNotification({ userId }: { userId: number }) {
  try {
    const datos = await Notifications.findAll({
      include: [{ model: Notification_read , attributes:['Read'], where: { User_id: userId } }],
      order: [["createdAt", "DESC"]],
      limit: 10,
    });
    
    return datos;
  } catch (error) {
    console.log(`error en utils/SocketIo.ts: ${error}`);
  }
}
