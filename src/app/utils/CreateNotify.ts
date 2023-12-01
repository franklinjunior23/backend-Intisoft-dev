import Notifications from "../models/Notifications";
import { FechaActually } from "./DateFecha";
import { Administradores,Notification_read  } from "../models";

const CreateNotify: CreateNotify = async (Message, UserAction) => {
  const { Hora } = FechaActually();

  try {
    // Crear la notificación
    const createdNotification: any = await Notifications.create({
      Message,
      UserAction,
      Hora,
    });

    if (createdNotification) {
      const notifyId = createdNotification.id;

      // Obtener todos los administradores
      const administradores: any = await Administradores.findAll();

      // Crear registros en notification_reads para cada administrador
      // Marcando la notificación como no leída por defecto
      const createReadsPromises = administradores.map(async (admin: any) => {
        const adminId = admin.id;
        await Notification_read.create({
          Notification_id	: notifyId,
          User_id: adminId,
          Read: false,
        });
      });

      await Promise.all(createReadsPromises);

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
  (Message: string, UserAction: string): Promise<boolean>;
}
