import { ValidateUser } from "../middleware/ValidateUser";
import {
  GetBaseConocimientos,
  CreateBaseConocimiento,
  UpdateById,
  GetBaseConocById,
} from "../controller/BaseConocimiento.controller";
import { Router } from "express";
import { upload } from "../services/Multer";
const BaseConocimientos = Router();
BaseConocimientos.get("/", GetBaseConocimientos);
BaseConocimientos.get("/:id", GetBaseConocById);
BaseConocimientos.post(
  "/",

  ValidateUser,
  upload.array("image"),
  CreateBaseConocimiento
);
BaseConocimientos.put("/:id", ValidateUser, upload.array("image"), UpdateById);

export default BaseConocimientos;
