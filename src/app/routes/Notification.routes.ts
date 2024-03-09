import { GetNotify } from "../controller/Notify.controller";
import { ValidateUser } from "../middleware/ValidateUser";
import { Router } from "express";

 const Notify_Routes = Router();
 Notify_Routes.get('/', ValidateUser,GetNotify)

 export default Notify_Routes;