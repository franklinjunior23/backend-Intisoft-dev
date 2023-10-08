"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEmailConexion = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
function CreateEmailConexion() {
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "SoftDevIntiscorp@gmail.com",
            pass: "qupj neiw bubh kjbr",
        },
        tls: {
            rejectUnauthorized: false
        },
    });
    // Verificar la conexión con el servicio de correo
    transporter.verify((error, success) => {
        if (error) {
            console.error("Error al conectar con el servicio de correo:", error);
        }
        else {
            console.log("Conexión exitosa con el servicio de correo");
        }
    });
    return transporter;
}
exports.CreateEmailConexion = CreateEmailConexion;
