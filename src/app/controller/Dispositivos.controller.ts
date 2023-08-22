import { Op } from "sequelize";
import Dispositivo from "../models/Dispositvo";
import { Request, Response } from "express";
import Users from "../models/Users";
import Sucursal from "../models/Sucursales";
import Empresa from "../models/Empresa";

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
        const data = req.body
        const EmpresaBySucursal = await Sucursal.findOne({
            where:{
                nombre:sucursal
            },

            include:[
                {model:Empresa,
                where:{
                    nombre:empresa
                }}
                   
            ]
        })

        
        res.json(EmpresaBySucursal)
        console.log(EmpresaBySucursal,empresa,sucursal)
    } catch (error) {
        
    }
}
