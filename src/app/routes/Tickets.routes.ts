import { CreateTickets, GetAllTickets } from "../controller/Tikets.controllers";
import { Router } from "express";

const TicketsRoutes = Router();

TicketsRoutes.get("/", GetAllTickets);
TicketsRoutes.post("/", CreateTickets);

export default TicketsRoutes;