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
exports.DeleteDisp = exports.UpdateDisp = exports.GetsDispositivos = exports.CreateDisp = exports.GetPcYLap = void 0;
const sequelize_1 = require("sequelize");
const Dispositvo_1 = __importDefault(require("../models/Dispositvo"));
const Users_1 = __importDefault(require("../models/Users"));
const Sucursales_1 = __importDefault(require("../models/Sucursales"));
const Empresa_1 = __importDefault(require("../models/Empresa"));
const DetalleComponents_1 = __importDefault(require("../models/DetalleComponents"));
const GetPcYLap = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Data = yield Dispositvo_1.default.findAll({
            where: {
                tipo: {
                    [sequelize_1.Op.in]: ["PC", "LAPTOP"],
                },
                IdUser: null,
            },
            include: [
                {
                    model: Users_1.default,
                },
            ],
        });
        res.json(Data);
    }
    catch (error) {
        res.status(500).json({ error });
        console.log(error);
    }
});
exports.GetPcYLap = GetPcYLap;
const CreateDisp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { empresa, sucursal } = req.params;
        const data = req.body;
        const EmpresaBySucursal = yield Sucursales_1.default.findOne({
            where: {
                nombre: sucursal,
            },
            include: [
                {
                    model: Empresa_1.default,
                    where: {
                        nombre: empresa,
                    },
                },
            ],
        });
        if (!EmpresaBySucursal)
            return res.json({ search: false });
        const CreateDisp = yield Dispositvo_1.default.create(data);
        const CreatComponDisp = yield DetalleComponents_1.default.create(Object.assign({ IdDispositivo: CreateDisp.id }, data));
        if (CreateDisp && CreatComponDisp) {
            return res.json({ create: true });
        }
    }
    catch (error) { }
});
exports.CreateDisp = CreateDisp;
const GetsDispositivos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Busq = yield Dispositvo_1.default.findAll({
            include: [
                {
                    model: DetalleComponents_1.default,
                },
            ],
        });
        res.json(Busq);
    }
    catch (error) {
        res.json({ error });
    }
});
exports.GetsDispositivos = GetsDispositivos;
const UpdateDisp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const DatsNew = req.body;
        const DataOld = yield Dispositvo_1.default.findOne({
            where: {
                id,
            },
            include: [
                {
                    model: DetalleComponents_1.default,
                },
            ],
        });
        if (!DataOld)
            return res.json({ error: true, search: false });
        return res.json(DataOld);
    }
    catch (error) {
        res.json({ error: true, UpdateDisp: exports.UpdateDisp });
    }
});
exports.UpdateDisp = UpdateDisp;
const DeleteDisp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const ExistData = yield Dispositvo_1.default.findOne({
            where: { id },
            include: [{ model: DetalleComponents_1.default }],
        });
        if (!ExistData)
            return res.json({ search: false });
        yield Dispositvo_1.default.destroy({
            where: {
                id,
            },
        });
        res.json({ search: true });
    }
    catch (error) {
        res.json({ error: true, msg: error });
    }
});
exports.DeleteDisp = DeleteDisp;
