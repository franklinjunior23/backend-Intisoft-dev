"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const sequelize_typescript_1 = require("sequelize-typescript");
const uuid_1 = require("uuid");
const Tikets = database_1.sequelize.define('tikets', {
    id: {
        type: sequelize_typescript_1.DataType.STRING,
        defaultValue: uuid_1.v4,
        primaryKey: true
    },
    Titulo: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    UsuarioId: {
        type: sequelize_typescript_1.DataType.INTEGER,
    },
    Estado: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    Fecha: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    Hora: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    Observacion: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    SucursalId: {
        type: sequelize_typescript_1.DataType.INTEGER,
    },
    Comentario: {
        type: sequelize_typescript_1.DataType.JSON,
    },
    PcId: {
        type: sequelize_typescript_1.DataType.INTEGER,
    }
});
exports.default = Tikets;
