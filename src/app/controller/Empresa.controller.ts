import Sucursal from "../models/Sucursales";
import Empresa from "../models/Empresa";
import { Request, Response } from "express";

//empresasss 
export const GetEmpresas =async(req:Request,res:Response)=>{
    try {
        const search = await Empresa.findAll({
            include:[{model:Sucursal}]
        });
        res.json(search);
    } catch (error) {
        console.log(error)
        res.json({empresas:false,msg:"error en el servidor comunique con el soporte"})
    }
}

export const CreateEmpresa=async (req:Request,res:Response) => {
    try {
        const {nombre,lugar}=req.body;
        if(nombre && lugar){
            const cret = await Empresa.create({
                nombre,lugar
            })
          return   res.json({create:true,cret})
        }
       return res.status(201).json({create:false,msg:"Complete los parametros requeridos"})
    } catch (error) {
        res.status(501).json({error:true, msg:"conectese con el administrador EMPCONTROLL"})
    }
}
export const DeleteEmpresa =async (req:Request,res:Response) => {
    try {
        const idEmpresa=req.params.id
        const resp = await Empresa.destroy({
            where:{
                id:idEmpresa
            }
        })
        if(!resp){
            return res.json({delete:false})
        }
        res.json({delete:true})
    } catch (error) {
        
    }
}





//sucursales