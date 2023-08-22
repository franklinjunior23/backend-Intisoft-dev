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
exports.GetPcYLap = void 0;
const sequelize_1 = require("sequelize");
const Dispositvo_1 = __importDefault(require("../models/Dispositvo"));
const Users_1 = __importDefault(require("../models/Users"));
const GetPcYLap = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Data = yield Dispositvo_1.default.findAll({
            where: {
                tipo: {
                    [sequelize_1.Op.in]: ['PC', 'LAPTOP']
                },
                IdUser: null
            },
            include: [
                {
                    model: Users_1.default
                }
            ]
        });
        res.json(Data);
    }
    catch (error) {
        res.status(500).json({ error });
        console.log(error);
    }
});
exports.GetPcYLap = GetPcYLap;
