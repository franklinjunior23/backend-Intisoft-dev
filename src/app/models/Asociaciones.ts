import { sequelize } from "../config/database";
import Administradores from "./Administradores";
import DetalleDispositivo from "./DetalleComponents";
import Dispositivo from "./Dispositvo";
import Empresa from "./Empresa";
import Informes from "./Informes";
import Roles from "./Roles";
import Sucursal from "./Sucursales";
import Tikets from "./Ticket";
import Users from "./Users";

try {
  // ROLES ASOCIACIONES DE UNO A MUCHOS ES DECIR ( UN SOLO //  ROL PUEDE TENER VARIAS PERSONAS )
  Roles.hasMany(Administradores, {
    foreignKey: "id_rol",
  });
  Administradores.belongsTo(Roles, {
    foreignKey: "id_rol",
    targetKey: "id",
  });

  // EMPRESA ASOCIACIONES DE UNO A MUCHOS ES DECIR ( UN SOLO //  ROL PUEDE TENER VARIAS PERSONAS )
  Empresa.hasMany(Sucursal, {
    foreignKey: "id_empresa",
  });
  Sucursal.belongsTo(Empresa, {
    foreignKey: "id_empresa",
    targetKey: "id",
  });

  // USERS ASOCIACIONES DE UNO A MUCHOS ES DECIR ( UN SOLO //  ROL PUEDE TENER VARIAS PERSONAS )
  Sucursal.hasMany(Users, {
    foreignKey: "IdSucursal",
  });
  Users.belongsTo(Sucursal, {
    foreignKey: "IdSucursal",
    targetKey: "id",
    onUpdate: "SET NULL", // Establecerá a NULL si se actualiza la Sucursal
    onDelete: "SET NULL",
  });

  // Dispositivo ASOCIACIONES DE UNO A MUCHOS ES DECIR ( UN SOLO //  ROL PUEDE TENER VARIAS PERSONAS )
  Sucursal.hasMany(Dispositivo, {
    foreignKey: "IdSucursal",
    onUpdate: "SET NULL", // Establecerá a NULL si se actualiza la Sucursal
    onDelete: "SET NULL", // Establecerá a NULL si se elimina la Sucursal
  });
  Dispositivo.belongsTo(Sucursal, {
    foreignKey: "IdSucursal",
    targetKey: "id",
    onUpdate: "SET NULL", // Establecerá a NULL si se actualiza la Sucursal
    onDelete: "SET NULL", // Establecerá a NULL si se elimina la Sucursal
  });
  Users.hasOne(Dispositivo, {
    foreignKey: "IdUser",
    onUpdate: "SET NULL", // Establecerá a NULL si se actualiza la Sucursal
    onDelete: "SET NULL", // Establecerá a NULL si se elimina la Sucursal
  });
  Dispositivo.belongsTo(Users, {
    foreignKey: "IdUser",
    targetKey: "id",
    onUpdate: "SET NULL", // Establecerá a NULL si se actualiza la Sucursal
    onDelete: "SET NULL",
  });

  Dispositivo.hasMany(DetalleDispositivo, {
    foreignKey: "IdDispositivo",
    onUpdate: "CASCADE", // Establecerá a NULL si se actualiza la Sucursal
    onDelete: "CASCADE", // Establecerá a NULL si se elimina la Sucursal
  });
  DetalleDispositivo.belongsTo(Dispositivo, {
    foreignKey: "IdDispositivo",
    targetKey: "id",
    onUpdate: "CASCADE", // Establecerá a NULL si se actualiza la Sucursal
    onDelete: "CASCADE", // Establecerá a NULL si se elimina la Sucursal
  });

  Dispositivo.hasMany(Informes, {
    foreignKey: "IdDispositivo",
    onUpdate: "SET NULL", // Establecerá a NULL si se actualiza la Sucursal
    onDelete: "SET NULL",
  });
  Informes.belongsTo(Dispositivo, {
    foreignKey: "IdDispositivo",
    targetKey: "id",
    onUpdate: "SET NULL", // Establecerá a NULL si se actualiza la Sucursal
    onDelete: "SET NULL",
  });
  Administradores.hasOne(Tikets, {
    foreignKey: "UsuarioId",
    onUpdate: "SET NULL",
    onDelete: "SET NULL",
  });
  Tikets.belongsTo(Administradores, {
    foreignKey: "UsuarioId",
    targetKey: "id",
    onUpdate: "SET NULL",
    onDelete: "SET NULL",
  });
  Sucursal.hasOne(Tikets, {
    foreignKey: "SucursalId",
    onUpdate: "SET NULL",
    onDelete: "SET NULL",
  });
  Tikets.belongsTo(Sucursal, { 
    foreignKey: "SucursalId",
    targetKey: "id",
    onUpdate: "SET NULL",
    onDelete: "SET NULL",
  });
 
} catch (error) {
  console.log(error);
}

sequelize.sync();
