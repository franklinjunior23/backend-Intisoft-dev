import Tikets from "../models/Ticket";
import Dispositivo from "../models/Dispositvo";
import Informes from "../models/Informes";
import { Request, Response } from "express";
import { FechaActually } from "../utils/DateFecha";
import Administradores from "../models/Administradores";
import Sucursal from "../models/Sucursales";
import Empresa from "../models/Empresa";
import { CountData } from "../utils/CountData";

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

export const GetDetailsHome = async(req:Request,res:Response) => { 
    try {
        const { Fecha } = FechaActually();
        const Ticke = await Tikets.findAll({
            where: {
              Fecha: Fecha,
            },
            include: [
              {
                model: Administradores,
                attributes: ["nombre", "apellido"],
              },
              {
                model: Sucursal,
                attributes: ["nombre"],
                include: [{ model: Empresa, attributes: ["nombre"] }],
              },
            ],
            order: [["createdAt", "DESC"]],
          });

          const InfoDips = await Dispositivo.findAll();
          const details ={
            Ticket:{
                TicketCount:Ticke.length,
                TicketData:Ticke,
            },
            Dispositivo:{
                PcCount:CountData(InfoDips,'Pc'),
                ServidoresCount:CountData(InfoDips,'Servidores'),
                LaptopCount:CountData(InfoDips,'Laptop'),
                DataDisp:InfoDips
            }
           
            
          }
          res.json(details)
    } catch (error:any) {
        res.json({create:false,msg:error.message})
    }
}