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
exports.Execute_roles = void 0;
const Roles_1 = __importDefault(require("../models/Roles"));
const roles_predete = [
    { nombre: "Administrador" },
    { nombre: "Soporte" },
    { nombre: "Cliente" }
];
const Execute_roles = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (const core of roles_predete) {
            yield Roles_1.default.create(core);
        }
    }
    catch (error) {
        console.log("salio mal en la creacion de roles predeterminados");
    }
});
exports.Execute_roles = Execute_roles;
