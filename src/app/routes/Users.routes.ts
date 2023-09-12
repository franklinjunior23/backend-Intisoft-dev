
import { CreateUserBySucursal, DeleteUserById, GetUserById, GetUsersByEmpresaAndSucursal, GetsUserDisp, UpdateUserById } from "../controller/User.controller";
import {  Router } from "express";
const UserRoutes = Router();


UserRoutes.get('/Disp',GetsUserDisp)
UserRoutes.get('/:id',GetUserById)
UserRoutes.put('/:id',UpdateUserById)
UserRoutes.delete('/:id',DeleteUserById)
UserRoutes.get('/:empresa/:sucursal',GetUsersByEmpresaAndSucursal)
UserRoutes.post('/:empresa/:sucursal',CreateUserBySucursal)


export default UserRoutes;