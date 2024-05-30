import { UpdateNotify } from "../../controller/Notify.controller";
import { ValidateUser } from "../../middleware/ValidateUser";

import { Router } from "express";

const Notifications_Routes = Router();
Notifications_Routes.put("/:id", ValidateUser, UpdateNotify);

export default Notifications_Routes;