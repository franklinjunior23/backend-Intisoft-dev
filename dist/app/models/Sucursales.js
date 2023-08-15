"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const sequelize_typescript_1 = require("sequelize-typescript");
const Sucursal = database_1.sequelize.define('Sucursales', {
    id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    id_empresa: {
        type: sequelize_typescript_1.DataType.INTEGER
    },
});
exports.default = Sucursal;
