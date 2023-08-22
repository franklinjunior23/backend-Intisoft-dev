"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const sequelize_typescript_1 = require("sequelize-typescript");
const Users = database_1.sequelize.define('Users', {
    id: {
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: sequelize_typescript_1.DataType.STRING
    },
    apellido: {
        type: sequelize_typescript_1.DataType.STRING
    },
    genero: {
        type: sequelize_typescript_1.DataType.STRING
    },
    tipo_doc: {
        type: sequelize_typescript_1.DataType.STRING
    },
    doc: {
        type: sequelize_typescript_1.DataType.STRING
    },
    cargo: {
        type: sequelize_typescript_1.DataType.STRING
    },
    tipo_usuario: {
        type: sequelize_typescript_1.DataType.STRING
    },
    nivel_red: {
        type: sequelize_typescript_1.DataType.STRING
    },
    usuario: {
        type: sequelize_typescript_1.DataType.STRING
    },
    contraseña: {
        type: sequelize_typescript_1.DataType.STRING
    },
    anydesk_id: {
        type: sequelize_typescript_1.DataType.STRING
    },
    anydesk_contra: {
        type: sequelize_typescript_1.DataType.STRING
    },
    email_tip: {
        type: sequelize_typescript_1.DataType.STRING
    },
    email_dirrecion: {
        type: sequelize_typescript_1.DataType.STRING
    },
    email_contraseña: {
        type: sequelize_typescript_1.DataType.STRING
    },
    IdSucursal: {
        type: sequelize_typescript_1.DataType.INTEGER
    }
});
exports.default = Users;
