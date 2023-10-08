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
exports.GetBaseConocById = exports.UpdateById = exports.CreateBaseConocimiento = exports.GetBaseConocimientos = void 0;
const DateFecha_1 = require("../utils/DateFecha");
const SuportDocs_1 = __importDefault(require("../models/SuportDocs"));
const GetBaseConocimientos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield SuportDocs_1.default.findAll({
            order: [["createdAt", "DESC"]],
        });
        const Details = {
            cantidad: data.length,
            create: (0, DateFecha_1.ActualyDats)(data),
        };
        return res.json({ details: Details, data });
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
        const files = req.files;
        console.log(Dats);
        if (UserCreate == null || "")
            return res.json({
                create: false,
                message: "Solamente los Soportes pueden acceder a ello",
            });
        const data = yield SuportDocs_1.default.create(Object.assign(Object.assign({}, Dats), { Autor: UserCreate, Archivos: [...files] }));
        if (!data) {
            return res.json({ create: false, message: "No se creo correctamente" });
        }
        return res.status(200).json({
            message: "Se creo correctamente",
            create: true,
        });
    }
    catch (error) {
        console.log({ msg: error, name: "CreateBaseConocimiento", line: 85 });
        return res.json({ create: false, message: "Error en el servidor" });
    }
});
exports.CreateBaseConocimiento = CreateBaseConocimiento;
const UpdateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const IDDOCSBS = req.params.id;
    const Data = req.body;
    try {
        if ((Data === null || Data === void 0 ? void 0 : Data.Contenido) == null || "")
            return res.json({ update: false, message: "Falta datos" });
        const DocOld = yield SuportDocs_1.default.update({ Contenido: Data === null || Data === void 0 ? void 0 : Data.Contenido }, {
            where: { id: IDDOCSBS },
        });
        console.log(DocOld);
        if (DocOld)
            return res.json({ update: true, message: `Se actualizo correctamente ` });
        return res.json({
            update: false,
            message: "No se actualizo correctamente",
        });
    }
    catch (error) {
        res.json({
            update: false,
            error: true,
            message: "Hubo un error , intente nuevamente",
        });
    }
});
exports.UpdateById = UpdateById;
const GetBaseConocById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id || id === null || id === undefined)
        return res.json({ error: true, message: "Falta datos" });
    try {
        const data = yield SuportDocs_1.default.findByPk(id);
        if (data === null || data === undefined)
            return res.json({ search: false, message: "No se encontro el registro" });
        return res.json({ search: true, data });
    }
    catch (error) {
        return res.json({ error: true, message: "Error en el servidor" });
    }
});
exports.GetBaseConocById = GetBaseConocById;
