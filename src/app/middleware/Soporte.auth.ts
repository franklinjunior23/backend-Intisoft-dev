import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

export async function ValidateSoporteToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const tokenUser = req.header(String(process.env.VALIDATION_HEADER));
  if (!tokenUser) return res.status(401).json({ message: "Token not provided" });
    const Cokie = req.cookies
    console.log(Cokie)
  try {
    const Decoded = await jwt.verify(
      tokenUser,
      process.env.SECRET_KEY_JWT || ""
    );
   
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid token" });
  }
}
