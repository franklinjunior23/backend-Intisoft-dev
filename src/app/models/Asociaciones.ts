import {sequelize} from "../config/database";
import Administradores from "./Administradores";
import Roles from "./Roles";

Roles.hasMany(Administradores, {
    foreignKey: 'id_rol',
    as: 'Administradores'
});
Administradores.belongsTo(Roles, {
    foreignKey: 'id_rol',
    targetKey: 'id'
});

sequelize.sync()