import { Ticket } from ".";
import { sequelize } from "../config/database";
import Administradores from "./Administradores";
import Area from "./Area";
import DetalleDispositivo from "./DetalleComponents";
import Dispositivo from "./Dispositvo";
import Empresa from "./Empresa";
import Informes from "./Informes";
import Notifications_read from "./Notification_read";
import Notifications from "./Notifications";
import Roles from "./Roles";
import Sucursal from "./Sucursales";
import Tikets from "./Ticket";
import Users from "./Users";
import History_device from "./history-device";

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
    onUpdate: "SET NULL", // Establecerá a NULL si se actualiza la Sucursal
    onDelete: "SET NULL",
  });
  Users.belongsTo(Sucursal, {
    foreignKey: "IdSucursal",
    targetKey: "id",
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
/**
 * 
  Dispositivo.hasOne(DetalleDispositivo, {
    as: "component",
  });
  DetalleDispositivo.belongsTo(Dispositivo, {
    as: "dispositivo",
  });

 */
 
  Dispositivo.hasOne(DetalleDispositivo, {
    foreignKey: "IdDispositivo",
    //as:'component',
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

  Empresa.hasOne(Tikets, {
    foreignKey: "EmpresaId",
    onUpdate: "SET NULL",
    onDelete: "SET NULL",
  });
  Tikets.belongsTo(Sucursal, {
    foreignKey: "EmpresaId",
    targetKey: "id",
    onUpdate: "SET NULL",
    onDelete: "SET NULL",
  });
  //Notifications
  Administradores.hasMany(Notifications_read, {
    foreignKey: "User_id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });
  Notifications_read.belongsTo(Administradores, {
    foreignKey: "User_id",
    targetKey: "id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });
  //Notification and Notification_read
  Notifications.hasMany(Notifications_read, {
    foreignKey: "Notification_id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });
  Notifications_read.belongsTo(Notifications, {
    foreignKey: "Notification_id",
    targetKey: "id",
  });
  Area.belongsTo(Sucursal);
  Users.belongsToMany(Area, { through: "UsuarioArea" });
  Area.belongsToMany(Users, { through: "UsuarioArea" });

  Users.belongsToMany(Dispositivo, { through: "UsuarioDispositivo" });
  Dispositivo.belongsToMany(Users, { through: "UsuarioDispositivo" });

  Area.belongsToMany(Dispositivo, { through: "AreaDispositivo" });
  Dispositivo.belongsToMany(Area, { through: "AreaDispositivo" });

  Dispositivo.hasMany(History_device, {
    foreignKey: "device", // El campo que actúa como clave foránea en HistoryDevice
    sourceKey: "id", // El campo en Dispositivo que se relaciona con la clave foránea
    as: "historial", // Alias para la relación
  });

  History_device.belongsTo(Dispositivo, {
    foreignKey: "device",
    targetKey: "id",
    as: "device_data", // Alias para la relación
  });
} catch (error) {
  console.log("asociaciones : " + error);
}

sequelize.sync();
