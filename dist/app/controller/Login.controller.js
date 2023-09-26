"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUsuariosAuth = exports.CreateUsuario = exports.SignIn = void 0;
const Administradores_1 = __importDefault(require("../models/Administradores"));
const sequelize_1 = require("sequelize");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const Roles_1 = __importDefault(require("../models/Roles"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const SignIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { usuario, contraseña } = req.body;
        const buscar = yield Administradores_1.default.findOne({
            where: { usuario: { [sequelize_1.Op.eq]: usuario } },
            attributes: ['nombre', 'apellido', 'contraseña', 'id'],
            include: [
                {
                    model: Roles_1.default,
                    attributes: ['nombre'], // Selecciona los atributos de Roles que necesitas,
                }
            ]
        });
        const VerifyPass = yield bcrypt_1.default.compare(contraseña, buscar.contraseña);
        if (!buscar || !VerifyPass) {
            return res.json({ loged: false });
        }
        const user = {
            nombre: buscar.nombre,
            apellido: buscar.apellido,
            rol: buscar.Role.nombre
        };
        const token_user = jsonwebtoken_1.default.sign({ datos: buscar }, process.env.SECRET_KEY_JWT || '');
        return res.json({ loged: true, token_user, user });
    }
    catch (error) {
        res.json({ error: true, msg: 'Error En el servidor, comuniquese con el Administrador' });
    }
});
exports.SignIn = SignIn;
const CreateUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dat_nuevo = req.body;
        const encript_passw = yield bcrypt_1.default.hash(dat_nuevo.contraseña, 9);
        const Nuevo = yield Administradores_1.default.create(Object.assign(Object.assign({}, dat_nuevo), { contraseña: encript_passw }));
        if (!Nuevo) {
            return res.json({ create: false });
        }
        return res.json({ create: true, Nuevo });
    }
    catch (error) {
        res.json({ error: true, msg: error });
    }
});
exports.CreateUsuario = CreateUsuario;
const GetUsuariosAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Administradores_1.default.findAll({
            include: [{ model: Roles_1.default }]
        });
        res.json(result);
    }
    catch (error) {
        res.json({ error: true, msg: error });
    }
});
exports.GetUsuariosAuth = GetUsuariosAuth;
