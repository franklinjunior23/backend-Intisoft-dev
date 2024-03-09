import { NextFunction, Request, Response } from "express";

export function AuthTokenCoockie(req:Request,res:Response,next:NextFunction){
   const Token = req.cookies._AuthUser
   console.log(Token)

}