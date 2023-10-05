import { ValidateUser } from "../middleware/ValidateUser";
import { GetBaseConocimientos,CreateBaseConocimiento, UpdateById } from "../controller/BaseConocimiento.controller";
import {  Router } from "express";
import { upload } from "../services/Multer";
const BaseConocimientos = Router();
BaseConocimientos.get("/", GetBaseConocimientos);
BaseConocimientos.post("/" ,ValidateUser,upload.array('files'), CreateBaseConocimiento);
BaseConocimientos.put("/:id",ValidateUser, UpdateById);



export default BaseConocimientos;