import { ValidateUser } from "../middleware/ValidateUser";
import { GetBaseConocimientos,CreateBaseConocimiento } from "../controller/BaseConocimiento.controller";
import {  Router } from "express";
const BaseConocimientos = Router();

BaseConocimientos.get("/", GetBaseConocimientos);
BaseConocimientos.post("/",ValidateUser, CreateBaseConocimiento);


export default BaseConocimientos;