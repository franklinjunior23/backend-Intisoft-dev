import { Model_Administradores } from "app/Interfaces/LoginInterface";
import Administradores from "../models/Administradores";
import { Request, Response } from "express";
import { Op } from "sequelize";
import jwt from "jsonwebtoken";
import "dotenv/config";
import Roles from "../models/Roles";
import bcrypt from "bcrypt";

export const SignIn = async (req: Request, res: Response) => {
  try {
    const { usuario, contraseña } = req.body;

    
    const buscar: any = await Administradores.findOne({
      where: { usuario: { [Op.eq]: usuario } },
      attributes: ["nombre", "apellido", "contraseña", "id"], // Selecciona los atributos que necesitas
      include: [
        {
          model: Roles,
          attributes: ["nombre"], // Selecciona los atributos de Roles que necesitas,
        },
      ],
    })
    const VerifyPass = await bcrypt.compare(contraseña, buscar?.contraseña);

    if (!buscar || !VerifyPass) {
      return res.json({ loged: false, message: "Usuario Incorrecto" });
    }
    const user = {
      nombre: buscar.nombre,
      apellido: buscar.apellido,
      rol: buscar.Role.nombre,
    };
    const token_user = jwt.sign(
      { datos: buscar },
      process.env.SECRET_KEY_JWT || "z2hk1OWGrBln30hwWnX3y"
    );
    // const Serialize = serialize("_AuthUser", token_user, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "none",
    //   path: "/",
    // });
    // res.cookie("_AuthUser", token_user,{
    //   httpOnly: true,
    //   secure: false,
    //   sameSite: "lax",
    //   path: "/",
    // });
    res.cookie("AuthUser", token_user).json({ loged: true, token_user, user });
  } catch (error: any) {
    console.log(error?.message);
    res.json({
      error: true,
      message: "Error En el servidor, comuniquese con el Administrador",
      messageError: error?.message,
    });
  }
};
export const CreateUsuario = async (req: Request, res: Response) => {
  try {
    const dat_nuevo: Model_Administradores = req.body;
    const encript_passw = await bcrypt.hash(dat_nuevo.contraseña, 9);
    const Nuevo = await Administradores.create({
      ...dat_nuevo,
      contraseña: encript_passw,
    });
    if (!Nuevo) {
      return res.json({ create: false });
    }
    return res.json({ create: true, Nuevo });
  } catch (error) {
    res.json({ error: true, msg: error });
  }
};

export const GetUsuariosAuth = async (req: Request, res: Response) => {
  try {
    const result = await Administradores.findAll({
      include: [{ model: Roles }],
    });
    res.json(result);
  } catch (error) {
    res.json({ error: true, msg: error });
  }
};
