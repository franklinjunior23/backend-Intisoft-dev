import {  Router } from "express";
import { CreateUsuario, SignIn } from "../controller/Login.controller";
const Login = Router()
Login.post('/',SignIn);
Login.post('/create',CreateUsuario)








export default Login