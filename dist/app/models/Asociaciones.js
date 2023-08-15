"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const Administradores_1 = __importDefault(require("./Administradores"));
const Empresa_1 = __importDefault(require("./Empresa"));
const Roles_1 = __importDefault(require("./Roles"));
const Sucursales_1 = __importDefault(require("./Sucursales"));
try {
    Roles_1.default.hasMany(Administradores_1.default, {
        foreignKey: 'id_rol',
    });
    Administradores_1.default.belongsTo(Roles_1.default, {
        foreignKey: 'id_rol',
        targetKey: 'id'
    });
    Empresa_1.default.hasMany(Sucursales_1.default, {
        foreignKey: 'id_empresa'
    });
    Sucursales_1.default.belongsTo(Empresa_1.default, {
        foreignKey: 'id_empresa',
        targetKey: 'id'
    });
}
catch (error) {
    console.log(error);
}
database_1.sequelize.sync();
