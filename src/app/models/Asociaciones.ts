import {sequelize} from "../config/database";
import Administradores from "./Administradores";
import Empresa from "./Empresa";
import Roles from "./Roles";
import Sucursal from "./Sucursales";

try {
    Roles.hasMany(Administradores, {
        foreignKey: 'id_rol',
       
    });
    Administradores.belongsTo(Roles, {
        foreignKey: 'id_rol',
        targetKey:'id'
    });
    Empresa.hasMany(Sucursal,{
        foreignKey:'id_empresa'
    })
    Sucursal.belongsTo(Empresa,{
        foreignKey:'id_empresa',
        targetKey:'id'
    })
    

} catch (error) {
    console.log(error)
}

sequelize.sync()