import History_device from "../../models/history-device";
import { Request, Response } from "express";

export const getHistoryDevice = async (req: Request, res: Response) => {
  const { idDevice } = req.params;
  try {
    const searchHistory = await History_device.findAll({
      where: {
        device: idDevice,
      },
      order : [['createdAt', 'DESC']]
    });
    if (!searchHistory)
      return res.status(404).json({ message: "Not Found", error: false });

    return res.json({ data: searchHistory });
  } catch (error: any) {
    return res
      .status(500)
      .json({
        message: "Error en el servidor",
        errorMessage: error?.message,
        error: true,
      });
  }
};
