
import { SendDataDevice } from "../controller/SystemInfo.controller";
import {  Router } from "express";



const SystemInfo = Router();

SystemInfo.post('/', SendDataDevice);


export default SystemInfo;