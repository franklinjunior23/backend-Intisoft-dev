import { Request, Response } from "express";


export const SendDataDevice = async (req:Request, res:Response) => {
   try {
    console.log([...req.body]);
   } catch (error) {
    console.log(error)
   }
}