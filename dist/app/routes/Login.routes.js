"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Login_controller_1 = require("../controller/Login.controller");
const Login = (0, express_1.Router)();
Login.post('/', Login_controller_1.SignIn);
Login.post('/create', Login_controller_1.CreateUsuario);
Login.get('/userAuth', Login_controller_1.GetUsuariosAuth);
exports.default = Login;
