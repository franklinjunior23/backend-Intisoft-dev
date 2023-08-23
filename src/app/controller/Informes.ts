import Dispositivo from "../models/Dispositvo";
import Informes from "../models/Informes";
import { Request, Response } from "express";

export const GetInformes =async (req:Request,res:Response) => {
    try {
        const data = await Informes.findAll({
            include:[
                {model:Dispositivo}
            ]
        })
        res.json(data)
    } catch (error) {
        
    }
    
}
export const CreateInforme = async(req:Request,res:Response)=>{
    try {
        res.json({create:true,msg:'creating'})
    } catch (error) {
        
    }
}