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
exports.CreateInforme = exports.GetInformes = void 0;
const Dispositvo_1 = __importDefault(require("../models/Dispositvo"));
const Informes_1 = __importDefault(require("../models/Informes"));
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
