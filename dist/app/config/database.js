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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
require("dotenv/config");
exports.sequelize = new sequelize_1.Sequelize(process.env.DBNAME || '', process.env.USER || '', process.env.PASWORD, {
    host: process.env.HOST || '',
    port: Number(process.env.LOCAL),
    dialect: 'mysql', /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});
const Connection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.sequelize.sync();
        console.log("se conecto");
    }
    catch (error) {
        console.log(error);
    }
});
exports.Connection = Connection;
