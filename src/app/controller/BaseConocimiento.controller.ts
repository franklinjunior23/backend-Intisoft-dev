import SuportDocs from "../models/SuportDocs";
import { Request, Response } from "express";

export const GetBaseConocimientos = async (req: Request, res: Response) => {
  try {
    const data = await SuportDocs.findAll({ order: [["createdAt", "DESC"]] });
    const Details = {
      cantidad: data.length,
    };
    return res.json({ Details: Details, data });
  } catch (error) {
    return res.status(401).json({ error, mesage: "Error en el servidor" });
  }
};

export const CreateBaseConocimiento = async (req: any, res: Response) => {
  try {
    const Dats = req.body;
    const UserCreate = req.User.nombre;
    const data = await SuportDocs.create({...Dats, Autor:UserCreate });
    if(data){
        return res.status(200).json({
            message: "Se creo correctamente",
            create:true
        })
    };
    return res.json({create:false, message: "No se creo correctamente"});


   
  } catch (error) {
    return res.status(401).json({ error, mesage: "Error en el servidor" });
  }
};
