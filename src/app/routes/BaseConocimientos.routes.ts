import { ValidateUser } from "../middleware/ValidateUser";
import {
  GetBaseConocimientos,
  CreateBaseConocimiento,
  UpdateById,
  GetBaseConocById,
  KnowledgeController,
  GetDeleteKnowledge,
} from "../controller/BaseConocimiento.controller";
import { Router } from "express";
import { upload } from "../services/Multer";
import AuthMiddleware from "../middleware/Auth.middelware";
import ROLE from "../enum/Role";
const BaseConocimientos = Router();

BaseConocimientos.get("/", GetBaseConocimientos);

BaseConocimientos.get(
  "/delete",
  new AuthMiddleware([ROLE.ADMIN]).AddGuard,
  GetDeleteKnowledge
);

// BaseConocimientos.get("/folder", new KnowledgeController().GetAll);
BaseConocimientos.get("/:id", GetBaseConocById);

// POST
BaseConocimientos.post(
  "/",
  new AuthMiddleware([ROLE.ADMIN, ROLE.SOPORTE]).AddGuard,
  upload.array("image"),
  CreateBaseConocimiento
);
BaseConocimientos.post(
  "/folder",
  new AuthMiddleware([ROLE.ADMIN, ROLE.SOPORTE]).AddGuard,
  new KnowledgeController().CreateFolder
);

BaseConocimientos.post(
  "/:folderId/article",
  new AuthMiddleware([ROLE.ADMIN, ROLE.SOPORTE]).AddGuard,
  new KnowledgeController().CreateArticleBYFolder
);

// PUT
BaseConocimientos.put(
  "/folder/:id/restaure",
  new AuthMiddleware([ROLE.ADMIN]).AddGuard,
  new KnowledgeController().RestaureFolder
);

BaseConocimientos.put(
  "/article/:id",
  new AuthMiddleware([ROLE.ADMIN, ROLE.SOPORTE]).AddGuard,
  UpdateById
);

// delete

BaseConocimientos.delete(
  "/folder/:id",
  new AuthMiddleware([ROLE.ADMIN]).AddGuard,
  new KnowledgeController().DeleteFolder
);

BaseConocimientos.delete(
  "/:id",
  new AuthMiddleware([ROLE.ADMIN]).AddGuard,
  UpdateById
);

export default BaseConocimientos;
