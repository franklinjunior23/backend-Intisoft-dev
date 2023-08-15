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
exports.GetSucursalesbyEmpresa = exports.CreateSucursal = exports.GetSucursales = void 0;
const Empresa_1 = __importDefault(require("../models/Empresa"));
const Sucursales_1 = __importDefault(require("../models/Sucursales"));
const GetSucursales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const busq = yield Sucursales_1.default.findAll({
            include: [{ model: Empresa_1.default }]
        });
        res.json({ exist: true, busq });
    }
    catch (error) {
        res.json({ exist: error, msg: 'Error en el servidor' });
    }
});
exports.GetSucursales = GetSucursales;
const CreateSucursal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, empresa } = req.body;
        if (nombre && empresa) {
            const creat = yield Sucursales_1.default.create({
                nombre,
                id_empresa: empresa
            });
            res.json({ create: true, creat });
        }
        return res.status(500).json({ create: false, msg: "Tienes que completar los datos requeridos" });
    }
    catch (error) {
    }
});
exports.CreateSucursal = CreateSucursal;
const GetSucursalesbyEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre } = req.params;
        const empre = yield Empresa_1.default.findOne({ where: { nombre } });
        const busqueda = yield Sucursales_1.default.findAll({
            where: {
                id_empresa: empre === null || empre === void 0 ? void 0 : empre.id
            }
        });
        res.json(busqueda);
    }
    catch (error) {
    }
});
exports.GetSucursalesbyEmpresa = GetSucursalesbyEmpresa;
