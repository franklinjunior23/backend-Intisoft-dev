const GetNotifcation= async()=>{
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
}