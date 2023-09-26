"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const sequelize_typescript_1 = require("sequelize-typescript");
const uuid_1 = require("uuid");
const SuportDocs = database_1.sequelize.define('suportDocs', {
    id: {
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: uuid_1.v4,
        primaryKey: true
    },
    Titulo: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    Contenido: {
        type: sequelize_typescript_1.DataType.TEXT,
    },
    Categoria: {
        type: sequelize_typescript_1.DataType.STRING,
    },
    Comentarios: {
        type: sequelize_typescript_1.DataType.JSON,
    },
    Autor: {
        type: sequelize_typescript_1.DataType.STRING,
    },
});
exports.default = SuportDocs;
