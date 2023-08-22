"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const Administradores_1 = __importDefault(require("./Administradores"));
const DetalleComponents_1 = __importDefault(require("./DetalleComponents"));
const Dispositvo_1 = __importDefault(require("./Dispositvo"));
const Empresa_1 = __importDefault(require("./Empresa"));
const Roles_1 = __importDefault(require("./Roles"));
const Sucursales_1 = __importDefault(require("./Sucursales"));
const Users_1 = __importDefault(require("./Users"));
try {
    // ROLES ASOCIACIONES DE UNO A MUCHOS ES DECIR ( UN SOLO //  ROL PUEDE TENER VARIAS PERSONAS )
    Roles_1.default.hasMany(Administradores_1.default, {
        foreignKey: 'id_rol',
    });
    Administradores_1.default.belongsTo(Roles_1.default, {
        foreignKey: 'id_rol',
        targetKey: 'id',
    });
    // EMPRESA ASOCIACIONES DE UNO A MUCHOS ES DECIR ( UN SOLO //  ROL PUEDE TENER VARIAS PERSONAS )
    Empresa_1.default.hasMany(Sucursales_1.default, {
        foreignKey: 'id_empresa',
    });
    Sucursales_1.default.belongsTo(Empresa_1.default, {
        foreignKey: 'id_empresa',
        targetKey: 'id',
    });
    // USERS ASOCIACIONES DE UNO A MUCHOS ES DECIR ( UN SOLO //  ROL PUEDE TENER VARIAS PERSONAS )
    Sucursales_1.default.hasMany(Users_1.default, {
        foreignKey: 'IdSucursal',
    });
    Users_1.default.belongsTo(Sucursales_1.default, {
        foreignKey: 'IdSucursal',
        targetKey: 'id',
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL'
    });
    // Dispositivo ASOCIACIONES DE UNO A MUCHOS ES DECIR ( UN SOLO //  ROL PUEDE TENER VARIAS PERSONAS )
    Sucursales_1.default.hasMany(Dispositvo_1.default, {
        foreignKey: 'IdSucursal',
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL' // Establecerá a NULL si se elimina la Sucursal
    });
    Dispositvo_1.default.belongsTo(Sucursales_1.default, {
        foreignKey: 'IdSucursal',
        targetKey: 'id',
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL' // Establecerá a NULL si se elimina la Sucursal
    });
    Users_1.default.hasOne(Dispositvo_1.default, {
        foreignKey: 'IdUser',
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL' // Establecerá a NULL si se elimina la Sucursal
    });
    Dispositvo_1.default.belongsTo(Users_1.default, {
        foreignKey: 'IdUser',
        targetKey: 'id',
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL'
    });
    Dispositvo_1.default.hasMany(DetalleComponents_1.default, {
        foreignKey: 'IdDispositivo',
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL' // Establecerá a NULL si se elimina la Sucursal
    });
    DetalleComponents_1.default.belongsTo(Dispositvo_1.default, {
        foreignKey: 'IdDispositivo',
        targetKey: 'id',
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL' // Establecerá a NULL si se elimina la Sucursal
    });
}
catch (error) {
    console.log(error);
}
database_1.sequelize.sync();
