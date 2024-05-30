import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

interface User extends Request {
  user?: Decoded;
}

interface Decoded {
  datos: {
    nombre: string;
    apellido: string;
    id: number | string;
    Role: {
      nombre: string;
    };
  };
}

type middleware = {
  auths: string[];
  ispublic?: boolean;
};

class AuthMiddleware {
  private auths: string[];
  private ispublic: boolean;

  constructor(auths: string[], ispublic: boolean = false) {
    this.auths = auths;
    this.ispublic = ispublic ?? false;
  }

  AddGuard = async (req: User, res: Response, next: NextFunction) => {
    if (this.ispublic) return next();

    const token = req.header(String(process.env.VALIDATION_HEADER));

    if (!token) {
      return res.status(401).json({ message: "Not Authorized" });
    }
    if (!process.env.SECRET_KEY_JWT)
      return res.status(500).json({ message: "Internal server error" });

    try {
      const decoded = jwt.verify(
        token,
        process.env.SECRET_KEY_JWT || ""
      ) as Decoded;

      if (
        this.auths.length > 0 &&
        !this.auths.includes(decoded.datos.Role.nombre)
      )
        return res.status(401).json({ message: "Not Authorized" });

      req.user = decoded;
      next();
    } catch (error: any) {
      return res.status(401).json({
        message: "Forbidden: You do not have access to this resource",
      });
    }
  };
}

export default AuthMiddleware;
