import { Request, Response } from "express";
import { Administradores, Notification_read, Notifications } from "../models";
import Notifications_read from "../models/Notification_read";

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
      order: [["createdAt", "DESC"]],
    });

    // Enviar las notificaciones como respuesta al cliente
    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener notificaciones");
  }
};
export const UpdateNotify = async (req: any, res: Response) => {
  try {
    const IdNotify = req.params.id;
    console.log(req.User)
    const { Read } = req.body;
    if (!Read)
      return res.status(500).json({
        error: true,
        msg: "Sucedio un error en el sisteme ",
      });

    const update = await Notifications_read.update(
      { Read :true },
      { where: { Notification_id: IdNotify ,User_id:req.User.id} }
    );
    res.json({ update });
  } catch (error) {}
};
