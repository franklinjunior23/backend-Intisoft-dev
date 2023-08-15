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
exports.DeleteEmpresa = exports.CreateEmpresa = exports.GetEmpresas = void 0;
const Sucursales_1 = __importDefault(require("../models/Sucursales"));
const Empresa_1 = __importDefault(require("../models/Empresa"));
//empresasss 
const GetEmpresas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const search = yield Empresa_1.default.findAll({
            include: [{ model: Sucursales_1.default }]
        });
        res.json(search);
    }
    catch (error) {
        console.log(error);
        res.json({ empresas: false, msg: "error en el servidor comunique con el soporte" });
    }
});
exports.GetEmpresas = GetEmpresas;
const CreateEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, lugar } = req.body;
        if (nombre && lugar) {
            const cret = yield Empresa_1.default.create({
                nombre, lugar
            });
            return res.json({ create: true, cret });
        }
        return res.status(201).json({ create: false, msg: "Complete los parametros requeridos" });
    }
    catch (error) {
        res.status(501).json({ error: true, msg: "conectese con el administrador EMPCONTROLL" });
    }
});
exports.CreateEmpresa = CreateEmpresa;
const DeleteEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idEmpresa = req.params.id;
        const resp = yield Empresa_1.default.destroy({
            where: {
                id: idEmpresa
            }
        });
        if (!resp) {
            return res.json({ delete: false });
        }
        res.json({ delete: true });
    }
    catch (error) {
    }
});
exports.DeleteEmpresa = DeleteEmpresa;
//sucursales
