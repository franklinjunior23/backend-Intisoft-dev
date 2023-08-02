import {  Router } from "express";
import { CreateUsuario, GetUsuariosAuth, SignIn } from "../controller/Login.controller";
const Login = Router()
Login.post('/',SignIn);
Login.post('/create',CreateUsuario)
Login.get('/userAuth',GetUsuariosAuth)








export default Login