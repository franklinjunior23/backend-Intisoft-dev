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
exports.ExecuteUserCreateDefect = void 0;
const EmailConfig_1 = require("../email/EmailConfig");
const Administradores_1 = __importDefault(require("../models/Administradores"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const users = [
    {
        nombre: "Franx",
        apellido: "De La Cruz",
        correo: "franklinjunior021118@gmail.com",
        usuario: "Franx",
        contraseña: "Franx0218",
        id_rol: 2,
    },
    {
        nombre: "Franklin",
        apellido: "Dcc",
        correo: "franklinjunior021118@gmail.com",
        usuario: "Franklin",
        contraseña: "Franklin232004",
        id_rol: 1,
    }
];
// Función para crear un hash de contraseña
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 9; // Número de rondas de sal
    return yield bcrypt_1.default.hash(password, saltRounds);
});
const ExecuteUserCreateDefect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUsers = yield Administradores_1.default.findAll({
            where: {
                usuario: users.map(user => user.usuario),
            },
        });
        const existingUsernames = existingUsers.map(user => user.get('usuario'));
        const newUsers = users.filter(user => !existingUsernames.includes(user.usuario));
        if (newUsers.length === 0) {
            console.log("Users already exist");
            return;
        }
        // Hash de la contraseña antes de crear el usuario
        const hashedPasswords = yield Promise.all(newUsers.map(user => hashPassword(user.contraseña)));
        newUsers.forEach((user, index) => user.contraseña = hashedPasswords[index]);
        yield Administradores_1.default.bulkCreate(newUsers, { fields: ['nombre', 'apellido', 'correo', 'usuario', 'contraseña', 'id_rol'] });
        const transporter = (0, EmailConfig_1.CreateEmailConexion)();
        const mailOptions = {
            from: "SoportDevSoft <soft@intiscorp.com.pe>",
            to: "franklinjunior021118@gmail.com",
            subject: "Create to User to backend",
            text: "LLego el mensaje de email sendmail",
            html: newUsers.map(user => `
        <h1>User</h1> 
        <ul>
          <li>Nombre: ${user.nombre}</li>
          <li>Apellido: ${user.apellido}</li>
          <li>Correo: ${user.correo}</li>
          <li>Usuario: ${user.usuario}</li>
        </ul>
      `).join('')
        };
        yield transporter.sendMail(mailOptions);
        console.log("Users created successfully");
    }
    catch (error) {
        console.error("Error:", error);
    }
});
exports.ExecuteUserCreateDefect = ExecuteUserCreateDefect;
