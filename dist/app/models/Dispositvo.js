"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const sequelize_typescript_1 = require("sequelize-typescript");
const Dispositivo = database_1.sequelize.define('Dispositivo', {
    id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_typescript_1.DataType.STRING
    },
    tipo: {
        type: sequelize_typescript_1.DataType.STRING
    },
    marca: {
        type: sequelize_typescript_1.DataType.STRING
    },
    modelo: {
        type: sequelize_typescript_1.DataType.STRING
    },
    serie: {
        type: sequelize_typescript_1.DataType.STRING
    },
    tipo_con: {
        type: sequelize_typescript_1.DataType.STRING
    },
    IdSucursal: {
        type: sequelize_typescript_1.DataType.INTEGER
    },
    IdUser: {
        type: sequelize_typescript_1.DataType.INTEGER
    }
});
exports.default = Dispositivo;
