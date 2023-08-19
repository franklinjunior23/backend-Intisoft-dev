import {sequelize} from "../config/database";
import Administradores from "./Administradores";
import DetalleDispositivo from "./DetalleComponents";
import Dispositivo from "./Dispositvo";
import Empresa from "./Empresa";
import Roles from "./Roles";
import Sucursal from "./Sucursales";
import Users from "./Users";

try {
    // ROLES ASOCIACIONES DE UNO A MUCHOS ES DECIR ( UN SOLO //  ROL PUEDE TENER VARIAS PERSONAS )
    Roles.hasMany(Administradores, {
        foreignKey: 'id_rol',
    });
    Administradores.belongsTo(Roles, {
        foreignKey: 'id_rol',
        targetKey:'id'
    });


    // EMPRESA ASOCIACIONES DE UNO A MUCHOS ES DECIR ( UN SOLO //  ROL PUEDE TENER VARIAS PERSONAS )
    Empresa.hasMany(Sucursal,{
        foreignKey:'id_empresa'
    })
    Sucursal.belongsTo(Empresa,{
        foreignKey:'id_empresa',
        targetKey:'id'
    })

     // USERS ASOCIACIONES DE UNO A MUCHOS ES DECIR ( UN SOLO //  ROL PUEDE TENER VARIAS PERSONAS )
    Sucursal.hasMany(Users,{
        foreignKey:'IdSucursal'
    })
    Users.belongsTo(Sucursal,{
        foreignKey:'IdSucursal',
        targetKey:'id'
    })

    // Dispositivo ASOCIACIONES DE UNO A MUCHOS ES DECIR ( UN SOLO //  ROL PUEDE TENER VARIAS PERSONAS )
    Sucursal.hasMany(Dispositivo,{
        foreignKey:'IdSucursal',
        onUpdate: 'SET NULL',    // Establecerá a NULL si se actualiza la Sucursal
        onDelete: 'SET NULL'     // Establecerá a NULL si se elimina la Sucursal
    })
    Dispositivo.belongsTo(Sucursal,{
        foreignKey:'IdSucursal',
        targetKey:'id',
        onUpdate: 'SET NULL',    // Establecerá a NULL si se actualiza la Sucursal
        onDelete: 'SET NULL'     // Establecerá a NULL si se elimina la Sucursal
    })

    Dispositivo.hasMany(DetalleDispositivo,{
        foreignKey:'IdDispositivo',
        onUpdate: 'SET NULL',    // Establecerá a NULL si se actualiza la Sucursal
        onDelete: 'SET NULL'     // Establecerá a NULL si se elimina la Sucursal
    })
    DetalleDispositivo.belongsTo(Dispositivo,{
        foreignKey:'IdDispositivo',
        targetKey:'id',
        onUpdate: 'SET NULL',    // Establecerá a NULL si se actualiza la Sucursal
        onDelete: 'SET NULL'     // Establecerá a NULL si se elimina la Sucursal
    })

} catch (error) {
    console.log(error)
}

sequelize.sync()