import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

export async function ValidateAdminToken(
  req: Request,
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
    if (Decoded.buscar.Role.nombre === "Administrador") return next();
    throw new Error("Invalid credentials required");
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Acceso denegado. No tienes el rol requerido para esta acción." });

  }
}
