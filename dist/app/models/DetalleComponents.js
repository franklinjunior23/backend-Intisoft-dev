"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const sequelize_typescript_1 = require("sequelize-typescript");
const DetalleDispositivo = database_1.sequelize.define('DetalleDispositivo', {
    id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    IdDispositivo: {
        type: sequelize_typescript_1.DataType.INTEGER
    },
    Config_mac: {
        type: sequelize_typescript_1.DataType.STRING
    },
    Config_ip: {
        type: sequelize_typescript_1.DataType.STRING
    },
    Config_user: {
        type: sequelize_typescript_1.DataType.STRING
    },
    Config_contra: {
        type: sequelize_typescript_1.DataType.STRING
    },
    Placa_modelo: {
        type: sequelize_typescript_1.DataType.STRING
    },
    Placa_detalle: {
        type: sequelize_typescript_1.DataType.STRING
    },
    Procesador_marca: {
        type: sequelize_typescript_1.DataType.STRING
    },
    Procesador_modelo: {
        type: sequelize_typescript_1.DataType.STRING
    },
    Ram_cantidad: {
        type: sequelize_typescript_1.DataType.STRING
    },
    Ram_Modulos: {
        type: sequelize_typescript_1.DataType.JSON
    },
    Almacenamiento_canti: {
        type: sequelize_typescript_1.DataType.STRING
    },
    Almacenamiento_detalle: {
        type: sequelize_typescript_1.DataType.JSON
    },
    Tarjeta_Video: {
        type: sequelize_typescript_1.DataType.JSON
    }
});
exports.default = DetalleDispositivo;
