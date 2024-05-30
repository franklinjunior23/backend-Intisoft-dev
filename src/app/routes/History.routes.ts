import { getHistoryDevice } from "../controller/History/history.controller";
import { Router } from "express";

const HistoryRoutes = Router();

HistoryRoutes.get('/:idDevice',getHistoryDevice);

export default HistoryRoutes;