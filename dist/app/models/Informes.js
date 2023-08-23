"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const sequelize_typescript_1 = require("sequelize-typescript");
const Informes = database_1.sequelize.define('Informe', {
    id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    IdDispositivo: {
        type: sequelize_typescript_1.DataType.INTEGER,
    },
    fecha: {
        type: sequelize_typescript_1.DataType.STRING
    },
    accion: {
        type: sequelize_typescript_1.DataType.STRING
    },
    observacion: {
        type: sequelize_typescript_1.DataType.STRING
    }
});
exports.default = Informes;
