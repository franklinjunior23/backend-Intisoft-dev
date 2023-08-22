import { Op } from "sequelize";
import Dispositivo from "../models/Dispositvo";
import { Request, Response } from "express";
import Users from "../models/Users";

export const GetPcYLap = async(req:Request,res:Response):Promise<void>=>{
    try {
        const Data = await Dispositivo.findAll({
            where:{
                tipo:{
                    [Op.in]: ['PC', 'LAPTOP']
                },
                IdUser:null 
            },
            include:[
                {
                    model:Users
                }
            ]
        })
        res.json(Data)
    } catch (error) {
        res.status(500).json({error})
        console.log(error)
    }
}


export const CreateDisp = async(req:Request,res:Response):Promise<void>=>{
    try {
        const {empresa,sucursal}= req.params;
        console.log(empresa,sucursal)
    } catch (error) {
        
    }
}