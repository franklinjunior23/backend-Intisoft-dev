import { Op } from "sequelize";
import Dispositivo from "../models/Dispositvo";
import { Request, Response } from "express";
import Users from "../models/Users";
import Sucursal from "../models/Sucursales";
import Empresa from "../models/Empresa";
import DetalleDispositivo from "../models/DetalleComponents";

export const GetPcYLap = async (req: Request, res: Response): Promise<void> => {
    try {
        const Data = await Dispositivo.findAll({
            where: {
                tipo: {
                    [Op.in]: ['PC', 'LAPTOP']
                },
                IdUser: null
            },
            include: [
                {
                    model: Users
                }
            ]
        })
        res.json(Data)
    } catch (error) {
        res.status(500).json({ error })
        console.log(error)
    }
}


export const CreateDisp = async (req: Request, res: Response)=> {
    try {
        const { empresa, sucursal } = req.params;
        const data = req.body
        const EmpresaBySucursal = await Sucursal.findOne({
            where: {
                nombre: sucursal
            },
            include: [
                {
                    model: Empresa,
                    where: {
                        nombre: empresa
                    }
                }
            ]
        })
        if (!EmpresaBySucursal) return res.json({ search: false });

        const CreateDisp: any = await Dispositivo.create(data)
        const CreatComponDisp = await DetalleDispositivo.create({
            IdDispositivo: CreateDisp.id,
            ...data
        })

        if (CreateDisp && CreatComponDisp) {
            return  res.json({create:true})
        }



    } catch (error) {

    }
}
export const GetsDispositivos = async(req:Request,res:Response)=>{
    try {
        const Busq = await Dispositivo.findAll({
            include:[
                {
                    model:DetalleDispositivo
                }
            ]
        })
        res.json(Busq)
    } catch (error) {
        res.json({error})
    }
}
