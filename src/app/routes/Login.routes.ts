import {  Router } from "express";
import { CreateUsuario, GetUsuariosAuth, SignIn } from "../controller/Login.controller";
import { ValidateAdminToken } from "../middleware/Admin.auth";
const Login = Router()
Login.post('/',SignIn);
Login.post('/create',ValidateAdminToken,CreateUsuario)
Login.get('/userAuth',ValidateAdminToken,GetUsuariosAuth)








export default Login