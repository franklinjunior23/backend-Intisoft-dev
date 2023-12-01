import { Request, Response } from 'express';
import { Administradores, Notification_read, Notifications } from '../models';

export const GetNotify = async (req: any, res: Response) => {
  try {
    // Obtener las notificaciones de la base de datos
    const idUser = req.User.id;
    const notifications = await Notifications.findAll({
      include: [
        {
          model: Notification_read,
          where: { User_id: idUser },
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    // Enviar las notificaciones como respuesta al cliente
    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener notificaciones');
  }
};

