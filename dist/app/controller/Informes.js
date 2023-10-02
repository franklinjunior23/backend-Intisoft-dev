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
exports.GetDetailsHome = exports.CreateInforme = exports.GetInformes = void 0;
const Ticket_1 = __importDefault(require("../models/Ticket"));
const Dispositvo_1 = __importDefault(require("../models/Dispositvo"));
const Informes_1 = __importDefault(require("../models/Informes"));
const DateFecha_1 = require("../utils/DateFecha");
const Administradores_1 = __importDefault(require("../models/Administradores"));
const Sucursales_1 = __importDefault(require("../models/Sucursales"));
const Empresa_1 = __importDefault(require("../models/Empresa"));
const CountData_1 = require("../utils/CountData");
const GetInformes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield Informes_1.default.findAll({
            include: [
                { model: Dispositvo_1.default }
            ]
        });
        res.json(data);
    }
    catch (error) {
    }
});
exports.GetInformes = GetInformes;
const CreateInforme = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({ create: true, msg: 'creating' });
    }
    catch (error) {
    }
});
exports.CreateInforme = CreateInforme;
const GetDetailsHome = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Fecha } = (0, DateFecha_1.FechaActually)();
        const Ticke = yield Ticket_1.default.findAll({
            where: {
                Fecha: Fecha,
            },
            include: [
                {
                    model: Administradores_1.default,
                    attributes: ["nombre", "apellido"],
                },
                {
                    model: Sucursales_1.default,
                    attributes: ["nombre"],
                    include: [{ model: Empresa_1.default, attributes: ["nombre"] }],
                },
            ],
            order: [["createdAt", "DESC"]],
        });
        const InfoDips = yield Dispositvo_1.default.findAll();
        const details = {
            Ticket: {
                TicketCount: Ticke.length,
                TicketData: Ticke,
            },
            Dispositivo: {
                PcCount: (0, CountData_1.CountData)(InfoDips, 'Pc'),
                ServidoresCount: (0, CountData_1.CountData)(InfoDips, 'Servidores'),
                LaptopCount: (0, CountData_1.CountData)(InfoDips, 'Laptop'),
                DataDisp: InfoDips
            }
        };
        res.json(details);
    }
    catch (error) {
        res.json({ create: false, msg: error.message });
    }
});
exports.GetDetailsHome = GetDetailsHome;
