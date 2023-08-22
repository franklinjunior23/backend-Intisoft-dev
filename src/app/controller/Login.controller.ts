import { Model_Administradores } from "app/Interfaces/LoginInterface";
import Administradores from "../models/Administradores";
import { Request, Response } from "express"
import { Op } from "sequelize";
import jwt from "jsonwebtoken"
import 'dotenv/config'
import Roles from "../models/Roles";
import bcrypt from "bcrypt"



export const SignIn = async (req: Request, res: Response) => {
    try {
        const { usuario, contraseña } = req.body;
        const buscar: any = await Administradores.findOne({
            where: { usuario: { [Op.eq]: usuario } },
            include: [{ model: Roles }]
        },)

        const VerifyPass = await bcrypt.compare(contraseña,buscar.contraseña );
        console.log(VerifyPass)

        if (!buscar || !VerifyPass) { return res.json({ loged: false }) }
        const user = {
            nombre: buscar.nombre,
            apellido: buscar.apellido,
            usuario: buscar.usuario,
            rol: buscar.Role.nombre
        }
        const token_user = jwt.sign({ buscar }, process.env.SECRET_KEY_JWT || '')
        return res.json({ loged: true, token_user, user })

    } catch (error) {
        res.json({ error: true, msg: error })
    }
}
export const CreateUsuario = async (req: Request, res: Response) => {
    try {
        const dat_nuevo: Model_Administradores = req.body
        const encript_passw = await bcrypt.hash(dat_nuevo.contraseña, 9);
        const Nuevo = await Administradores.create({ ...dat_nuevo, contraseña: encript_passw })
        if (!Nuevo) {
            return res.json({ create: false })
        }
        return res.json({ create: true, Nuevo })
    } catch (error) {
        res.json({ error: true, msg: error })

    }
}

export const GetUsuariosAuth = async (req: Request, res: Response) => {
    try {
        const result = await Administradores.findAll({
            include: [{ model: Roles }]
        })
        res.json(result)
    } catch (error) {
        res.json({ error: true, msg: error })
    }
}