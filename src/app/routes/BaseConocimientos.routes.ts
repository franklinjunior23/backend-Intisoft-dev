import { ValidateUser } from "../middleware/ValidateUser";
import { GetBaseConocimientos,CreateBaseConocimiento, UpdateById } from "../controller/BaseConocimiento.controller";
import {  Router } from "express";
const BaseConocimientos = Router();

BaseConocimientos.get("/", GetBaseConocimientos);
BaseConocimientos.post("/",ValidateUser, CreateBaseConocimiento);
BaseConocimientos.put("/:id",ValidateUser, UpdateById);



export default BaseConocimientos;