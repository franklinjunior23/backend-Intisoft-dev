import Empresa from "../models/Empresa";
import { Request, Response } from "express";





//empresasss 
export const GetEmpresas =async(req:Request,res:Response)=>{
    try {
        const search = await Empresa.findAll();
        res.json(search);
    } catch (error) {
        console.log(error)
        res.json({empresas:false,msg:"error en el servidor comunique con el soporte"})
    }
}







//sucursales