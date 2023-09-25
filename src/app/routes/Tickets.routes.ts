import { ValidateUser } from "../middleware/ValidateUser";
import { CreateTickets, GetAllTickets } from "../controller/Tikets.controllers";
import { Router } from "express";

const TicketsRoutes = Router();

TicketsRoutes.get("/", GetAllTickets);
TicketsRoutes.post("/",ValidateUser, CreateTickets);

export default TicketsRoutes;