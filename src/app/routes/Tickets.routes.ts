import { ValidateUser } from "../middleware/ValidateUser";
import {
  CreateTickets,
  GetAllTickets,
  UpdateTickets,
} from "../controller/Tikets.controllers";
import { Router } from "express";

const TicketsRoutes = Router();

TicketsRoutes.get("/", GetAllTickets);
TicketsRoutes.post("/", ValidateUser, CreateTickets);
TicketsRoutes.put("/:id", ValidateUser, UpdateTickets);

export default TicketsRoutes;
