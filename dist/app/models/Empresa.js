"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const sequelize_typescript_1 = require("sequelize-typescript");
const Empresa = database_1.sequelize.define('Empresa', {
    id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    lugar: {
        type: sequelize_typescript_1.DataType.STRING,
    },
});
exports.default = Empresa;
