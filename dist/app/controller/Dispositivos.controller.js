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
exports.GetsDispUsingUser = exports.GetsDispositivo = exports.DeleteDisp = exports.UpdateDisp = exports.GetsDispositivos = exports.CreateDisp = exports.GetPcYLap = void 0;
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
        console.log("llego");
        console.log(data);
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
        const EmpresaSearch = yield Sucursales_1.default.findOne({
            where: {
                nombre: sucursal,
            },
            include: [{ model: Empresa_1.default, where: { nombre: empresa } }],
        });
        const { Ram_Modulos, Almacenamiento } = data;
        if (Ram_Modulos || Almacenamiento) {
            const DatosProx = {
                Ram_cantidad: Ram_Modulos.length,
                Ram_Modulos: Ram_Modulos,
                Almacenamiento_canti: Almacenamiento.length,
                Almacenamiento_detalle: Almacenamiento,
            };
            if ((data === null || data === void 0 ? void 0 : data.IdUser) == "" || "null") {
                const CreateDisp = yield Dispositvo_1.default.create(Object.assign(Object.assign({}, data), { IdSucursal: EmpresaSearch === null || EmpresaSearch === void 0 ? void 0 : EmpresaSearch.id, IdUser: null }));
                const CreatComponDisp = yield DetalleComponents_1.default.create(Object.assign(Object.assign({ IdDispositivo: CreateDisp.id }, data), DatosProx));
                if (CreateDisp && CreatComponDisp) {
                    return res.json({ create: true });
                }
            }
        }
        const respCreat = yield Dispositvo_1.default.create(Object.assign(Object.assign({}, data), { IdSucursal: EmpresaSearch === null || EmpresaSearch === void 0 ? void 0 : EmpresaSearch.id }));
        yield DetalleComponents_1.default.create(Object.assign(Object.assign({}, data), { IdDispositivo: respCreat === null || respCreat === void 0 ? void 0 : respCreat.id }));
        return res.json({ create: true });
        console.log(exports.CreateDisp);
    }
    catch (error) {
        console.log(error);
    }
});
exports.CreateDisp = CreateDisp;
const GetsDispositivos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { empresa, sucursal } = req.query;
        if (empresa && sucursal == undefined) {
            throw new Error("Error Parametros");
        }
        console.log(empresa, sucursal);
        const Busq = yield Dispositvo_1.default.findAll({
            include: [
                {
                    model: DetalleComponents_1.default,
                },
                {
                    model: Sucursales_1.default,
                    where: { nombre: sucursal },
                    include: [{ model: Empresa_1.default, where: { nombre: empresa } }],
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
        const DataDispositivo = yield Dispositvo_1.default.findByPk(id);
        const DataDetalleDisp = yield DetalleComponents_1.default.findOne({
            where: { IdDispositivo: id },
        });
        console.log(DatsNew);
        const CamposUpd = {};
        for (const CampUpdate in DatsNew) {
            if (DataDispositivo[CampUpdate] !== DatsNew[CampUpdate]) {
                CamposUpd[CampUpdate] = DatsNew[CampUpdate];
            }
        }
        if (!DatsNew.IdUser || DatsNew.IdUser === 'null') {
            console.log("funcionó");
            CamposUpd.IdUser = null;
        }
        yield DataDispositivo.update(CamposUpd);
        const Campos = {};
        for (const CampUpdate in DatsNew) {
            if (DataDetalleDisp[CampUpdate] !== DatsNew[CampUpdate]) {
                Campos[CampUpdate] = DatsNew[CampUpdate];
            }
        }
        Campos.Almacenamiento_detalle = Campos.Almacenamiento;
        yield DataDetalleDisp.update(Campos);
        return res.json({ Campos });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: true, message: "Error al actualizar el dispositivo" });
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
const GetsDispositivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(id);
        const Exist = yield Dispositvo_1.default.findOne({
            where: {
                id,
            },
            include: [{ model: DetalleComponents_1.default }, { model: Users_1.default }],
        });
        return res.json({ data: Exist });
    }
    catch (error) { }
});
exports.GetsDispositivo = GetsDispositivo;
const GetsDispUsingUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.query;
        console.log(data);
        const { empresa, sucursal } = req.query;
        const resp = yield Dispositvo_1.default.findAll({
            include: [
                {
                    model: Sucursales_1.default,
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
                },
                {
                    model: Users_1.default,
                },
            ],
        });
        res.json(resp);
    }
    catch (error) {
        console.log(error);
    }
});
exports.GetsDispUsingUser = GetsDispUsingUser;
