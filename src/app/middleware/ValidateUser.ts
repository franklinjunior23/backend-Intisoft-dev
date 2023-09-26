import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

export async function ValidateUser(
  req: any,
  res: Response,
  next: NextFunction
) {
  const tokenUser = req.header(String(process.env.VALIDATION_HEADER));
  if (!tokenUser)
    return res.status(401).json({ message: "Token not provided" });

  try {
    const Decoded: any = await jwt.verify(
      tokenUser,
      process.env.SECRET_KEY_JWT || ""
    );
    if (Decoded.datos.Role.nombre === "Cliente")
      return res.status(403).json({ message: "Access forbidden" });
    // Asignar los datos del usuario decodificado al objeto req.user
    req.User = { ...Decoded?.datos };

    // Continuar con la ejecución de la solicitud
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid token" });
  }
}
