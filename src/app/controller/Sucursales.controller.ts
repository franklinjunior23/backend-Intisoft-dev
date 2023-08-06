import Empresa from "../models/Empresa";
import Sucursal from "../models/Sucursales";
import { Request, Response } from "express";


export const GetSucursales = async(req:Request,res:Response)=>{
    try {
        const busq = await Sucursal.findAll({
            include:[{model:Empresa}]
        })
        res.json({exist:true,busq})
    } catch (error) {
        res.json({exist:error, msg:'Error en el servidor'})
    }
}
export const CreateSucursal =async (req:Request,res:Response) => {
    try {
        const {nombre,empresa}= req.body
    if(nombre  && empresa ){
        const creat = await Sucursal.create({
            nombre,
            id_empresa:empresa
        })
        res.status(400).json({create:true,creat})
        
    }
    return res.status(500).json({create:false,msg:"Tienes que completar los datos requeridos"})
    } catch (error) {
        
    }
}