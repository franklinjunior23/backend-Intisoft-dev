import { ValidateUser } from "../middleware/ValidateUser";
import {
  AddNoteToDisp,
  AuthDispAgent,
  CreateDisp,
  CreateDispAgent,
  DeleteAreaforDevice,
  DeleteDisp,
  DeleteNoteForDevice,
  GetsDispUsingUser,
  GetsDispositivo,
  GetsDispositivos,
  UnlickUser,
  UpdateDisp,
  UpdateNoteToDisp,
} from "../controller/Dispositivos.controller";
import { Router } from "express";

const DispostivoRoutes = Router();

// Rutas de lectura (GET)
DispostivoRoutes.get("/", GetsDispositivos);
DispostivoRoutes.get("/:id", GetsDispositivo);
DispostivoRoutes.get("/Users", GetsDispUsingUser);

// Rutas de creación (POST)
DispostivoRoutes.post("/Agent/Auth", AuthDispAgent);
DispostivoRoutes.post("/Agent", CreateDispAgent);
DispostivoRoutes.post("/:id/notes", AddNoteToDisp);
DispostivoRoutes.post("/:empresa/:sucursal", ValidateUser, CreateDisp);


// Rutas de actualización (PUT)
DispostivoRoutes.put("/:id", ValidateUser, UpdateDisp);
DispostivoRoutes.put("/:id/notes/:idNote", UpdateNoteToDisp);

// Rutas de eliminación (DELETE)
DispostivoRoutes.delete("/:id", ValidateUser, DeleteDisp);
DispostivoRoutes.delete("/unlick-user/:id", UnlickUser);
DispostivoRoutes.delete("/area/:id", DeleteAreaforDevice);
DispostivoRoutes.delete('/:id/notes/:idNote', DeleteNoteForDevice);

export default DispostivoRoutes;
