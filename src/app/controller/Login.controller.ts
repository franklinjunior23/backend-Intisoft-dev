import { Model_Administradores } from "app/Interfaces/LoginInterface";
import Administradores from "../models/Administradores";
import { Request, Response } from "express"
import { Op } from "sequelize";

export const SignIn =async(req:Request,res:Response)=>{
    try {
        const {usuario,contraseña}= req.body;
        const buscar = await Administradores.findOne({
            where:{usuario:{[Op.eq]:usuario}}
        })
        if(!buscar){ return res.json({loged:false}) }
        
        return res.json({loged:true,buscar})

    } catch (error) {
        
    }
}
export const CreateUsuario=async (req:Request,res:Response) => {
    try {
        const dat_nuevo:Model_Administradores = req.body
        const Nuevo= await Administradores.create({...dat_nuevo})
        if(!Nuevo){
            return res.json({create:false})
        }
        return res.json({create:true,Nuevo})
    } catch (error) {
        
    }
}