import Notifications from "../models/Notifications";
import { FechaActually } from "./DateFecha";
import { Administradores, Notification_read } from "../models";
import { io } from "../../app";

const CreateNotify: CreateNotify = async (Message, UserAction,idUserAction) => {
  // captar la hora del momento con una clase
  const { Hora } = FechaActually();

  try {
    // Crear la notificación
    // Crear la notificacion con los campos que vienene de la funcion
    const createdNotification: any = await Notifications.create({
      Message,
      UserAction,
      Hora,
    });

    // Validar si se creo de manera correcta la notificacion
    if (createdNotification) {
      // agarrar el id de la notificacion
      const notifyId = createdNotification.id;

      // Obtener todos los administradores para luego recorrerlos
      const administradores: any = await Administradores.findAll({where:{id_rol:[1,2]}});

      // Crear registros en notification_reads para cada administrador
      // Marcando la notificación como no leída por defecto
      const createReadsPromises = administradores.map(async (admin: any) => {
        const adminId = admin.id;
        await Notification_read.create({
          Notification_id: notifyId,
          User_id: adminId,
          Read: false,
        });
      });

   

      await Promise.all(createReadsPromises);

      const datosNew = await Notifications.findAll({
        include: [{ model: Notification_read , where:{User_id:idUserAction},attributes:['Read'] }],
        order: [["createdAt", "DESC"]],
      });
      io.emit("mensajeNuevo", datosNew);
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error al crear notificación:", error);
    return false;
  }
};

export default CreateNotify;

interface CreateNotify {
  (Message: string, UserAction: string,idUserAction:Number): Promise<boolean>;
}
