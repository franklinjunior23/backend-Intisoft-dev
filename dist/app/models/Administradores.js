"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const sequelize_typescript_1 = require("sequelize-typescript");
const Administradores = database_1.sequelize.define('Administradores', {
    id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    },
    apellido: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    },
    correo: {
        type: sequelize_typescript_1.DataType.STRING
    },
    usuario: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    },
    contraseña: {
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    },
    id_rol: {
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    }
});
exports.default = Administradores;
