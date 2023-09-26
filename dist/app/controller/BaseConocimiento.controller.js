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
exports.CreateBaseConocimiento = exports.GetBaseConocimientos = void 0;
const SuportDocs_1 = __importDefault(require("../models/SuportDocs"));
const GetBaseConocimientos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield SuportDocs_1.default.findAll({ order: [["createdAt", "DESC"]] });
        const Details = {
            cantidad: data.length,
        };
        return res.json({ Details: Details, data });
    }
    catch (error) {
        return res.status(401).json({ error, mesage: "Error en el servidor" });
    }
});
exports.GetBaseConocimientos = GetBaseConocimientos;
const CreateBaseConocimiento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Dats = req.body;
        const UserCreate = req.User.nombre;
        const data = yield SuportDocs_1.default.create(Object.assign(Object.assign({}, Dats), { Autor: UserCreate }));
        if (data) {
            return res.status(200).json({
                message: "Se creo correctamente",
                create: true
            });
        }
        ;
        return res.json({ create: false, message: "No se creo correctamente" });
    }
    catch (error) {
        return res.status(401).json({ error, mesage: "Error en el servidor" });
    }
});
exports.CreateBaseConocimiento = CreateBaseConocimiento;
