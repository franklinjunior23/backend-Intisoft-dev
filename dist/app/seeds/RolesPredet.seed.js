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
exports.ExecuteRoles = void 0;
const Roles_1 = __importDefault(require("../models/Roles"));
const roles_predeterminados = [
    { nombre: "Administrador" },
    { nombre: "Soporte" },
    { nombre: "Cliente" }
];
const ExecuteRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Verifica cuántos registros coinciden con los nombres de roles predeterminados.
        const { count } = yield Roles_1.default.findAndCountAll({
            where: {
                nombre: roles_predeterminados.map((role) => role.nombre)
            }
        });
        // Si count es igual al número de roles predeterminados, ya existen en la base de datos.
        if (count === roles_predeterminados.length) {
            console.log("Los roles predeterminados ya existen en la base de datos.");
        }
        else {
            // Crea los roles que no existen en la base de datos.
            for (const core of roles_predeterminados) {
                yield Roles_1.default.create(core);
            }
            console.log("Se crearon los roles predeterminados.");
        }
    }
    catch (error) {
        console.log("Ocurrió un error en la creación de roles predeterminados:", error);
    }
});
exports.ExecuteRoles = ExecuteRoles;
