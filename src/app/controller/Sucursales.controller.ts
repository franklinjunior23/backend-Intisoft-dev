import Empresa from "../models/Empresa";
import Sucursal from "../models/Sucursales";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { Op } from "sequelize";
import { Model } from "sequelize-typescript";
import { DateTime } from "luxon";
import XlsxPopulate from "xlsx-populate";
import { Dispositivo, Users } from "../models";
import DetalleDispositivo from "../models/DetalleComponents";

export const GetSucursales = async (req: Request, res: Response) => {
  try {
    const busq = await Sucursal.findAll({
      include: [{ model: Empresa }],
    });

    return res.json({ exist: true, busq });
  } catch (error) {
    return res.status(500).json({ exist: false, msg: "Error en el servidor" });
  }
};
export const CreateSucursal = async (req: any, res: Response) => {
  try {
    const { nombre, empresa } = req.body;

    if (!nombre || !empresa)
      return res.status(500).json({
        create: false,
        succes: true,
        error: true,
        message: "Tienes que completar los datos requeridos",
      });

    const Emprsa: any =
      (await Empresa.findByPk(empresa)) ??
      (await Empresa.findOne({
        where: { nombre: { [Op.eq]: empresa } },
        attributes: ["id", "nombre"],
      }));

    const { count } = await Sucursal.findAndCountAll({
      where: {
        nombre,
      },
      include: [{ model: Empresa, where: { nombre: { [Op.eq]: empresa } } }],
    });

    if (count > 0) {
      return res.json({
        error: true,
        message: "No se puede crear la sucursal , ya existe.",
        succes: false,
      });
    }

    const creat = await Sucursal.create({
      nombre,
      id_empresa: Emprsa?.id,
      Token: uuidv4(),
    });
    return res.json({
      create: true,
      succes: true,
      error: false,
      message: `Sucursal creada correctamente , Empresa ${Emprsa?.nombre}`,
    });
  } catch (error: any) {
    console.log(`Error Create-Branch : ${error?.message}`);
    return res.status(500).json({
      error: true,
      message: error?.message,
      observation: "Error Valid CreateBranc",
    });
  }
};

export const GetSucursalesbyEmpresa = async (req: any, res: Response) => {
  try {
    const { nombre } = req.params;
    const role = req.User.Role.nombre;
    const validate =
      role === "Soporte"
        ? { deletedAt: null }
        : role === "Admin"
        ? {}
        : { deletedAt: null };

    const empre: any = await Empresa.findOne({
      where: { nombre: { [Op.eq]: nombre } },
    });

    if (!empre) {
      const details = {
        msg: "No se encontro la empresa",
        error: true,
      };
      return res.json({ details });
    }

    const busqueda = await Sucursal.findAll({
      where: {
        id_empresa: empre?.id,
        ...validate,
      },
    });

    return res.json(busqueda);
  } catch (error: any) {
    console.log(error);
    return res.json({
      message: error?.message,
    });
  }
};

export const SignDevice = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.json({ error: true, msg: "Token Invalido" });
    }

    const sucursal = await Sucursal.findOne({ where: { Token: token } });

    if (!sucursal) {
      const details = {
        message: "Token Invalido , intente nuevamente",
        estatus: "error",
      };
      return res.json({ ...details });
    }

    res.json(sucursal);
  } catch (error) {
    console.log({ error: true, message: error });
    res.json({ error: true, message: error });
  }
};

export async function DeleteBranch(req: any, res: Response) {
  try {
    const { id } = req.params;
    const sucursal: Model<any> = await Sucursal.findByPk(id);

    if (!sucursal) {
      return res.json({ error: true, msg: "No se encontro la sucursal" });
    }

    await sucursal.update({
      deletedAt: DateTime.local().setZone("America/Lima").toISO(),
    });

    return res.json({ delete: true, succes: true, msg: "Sucursal eliminada" });
  } catch (error: any) {
    console.log(error);
    return res.json({ error: true, message: error });
  }
}

export async function UpdateBranch(req: any, res: Response) {
  try {
    const { id } = req.params;
    const { nombre, empresa } = req.body;

    const sucursal: Model<any> = await Sucursal.findByPk(id);

    if (!sucursal) {
      return res.json({ error: true, msg: "No se encontro la sucursal" });
    }

    const Emprsa: any =
      (await Empresa.findByPk(empresa)) ??
      (await Empresa.findOne({
        where: { nombre: { [Op.eq]: empresa } },
      }));

    if (!Emprsa) {
      return res.json({ error: true, msg: "No se encontro la empresa" });
    }

    await sucursal.update({
      nombre,
      id_empresa: Emprsa?.id,
    });

    return res.json({
      update: true,
      succes: true,
      msg: "Sucursal actualizada",
    });
  } catch (error: any) {
    console.log(error);
    return res.json({ error: true, message: error });
  }
}

export async function GetsBranchaDelete(req: any, res: Response) {
  try {
    const { company } = req.query;

    const sucursales = await Sucursal.findAll({
      where: { deletedAt: { [Op.ne]: null } }, // Corrección aquí
      include: [{ model: Empresa, where: { nombre: { [Op.eq]: company } } }],
    });

    return res.json({
      error: false,
      data: sucursales,
    });
  } catch (error: any) {
    console.log(error);
    return res.json({ error: true, message: error });
  }
}

export async function RestaureBranch(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const sucursal: Model<any> = await Sucursal.findByPk(id);
    await sucursal.update({
      deletedAt: null,
    });
    return res.json({
      error: false,
      succes: true,
      message: "Sucursal restaurada",
    });
  } catch (error: any) {
    console.log(error + "error-restaure");
    return res.json({
      error: true,
      message: error,
      messageServer: error?.message,
    });
  }
}
export async function DeleteDefineBranch(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const sucursal: Model<any> = await Sucursal.findByPk(id);
    await sucursal.destroy();

    return res.json({
      error: false,
      succes: true,
      message: "Sucursal eliminada",
    });
  } catch (error: any) {
    console.log(error + "error-delete-defined-branch");
    return res.json({
      error: true,
      message: error,
      messageServer: error?.message,
    });
  }
}

export async function ExcelINventory(req: Request, res: Response) {
  const { company, branch } = req.params;
  try {
    const workbook = await XlsxPopulate.fromBlankAsync();
    const sheet = workbook.sheet(0);
    sheet.name("Usuarios");

    // Encabezados de la tabla
    const headers = [
      "ID",
      "Nombre y Apellido",
      "Género",
      "Cargo",
      "Estado",
      "PC Asignada",
      "Anydesk",
    ];

    // Escribir los encabezados en la celda B7
    headers.forEach((header, index) => {
      sheet.cell(7, index + 2).value(header);
      sheet.cell(7, index + 2).style({
        bold: true,
        fill: "CCCCCC",
        horizontalAlignment: "center",
        verticalAlignment: "center",
      });
    });

    // Obtener datos de usuarios
    const Usersdata: any = await Users.findAll({
      include: [
        {
          model: Dispositivo,
        },
        {
          model: Sucursal,
          where: { nombre: { [Op.eq]: branch } },
          include: [
            { model: Empresa, where: { nombre: { [Op.eq]: company } } },
          ],
        },
      ],
    });

    // Insertar datos de usuarios en la tabla
    Usersdata.forEach((usuario: any, rowIndex: number) => {
      // Mapear los datos del usuario con los encabezados de la tabla
      const datosUsuario = [
        usuario.id,
        `${usuario.nombre} ${usuario.apellido}`,
        usuario.genero ?? "No especificado",
        usuario.cargo,
        usuario.estado,
        usuario.Dispositivo ? usuario.Dispositivo?.nombre : "pc no asignada", // Obtener nombre de la PC asignada
        usuario.anydesk_id,
      ];

      // Insertar datos del usuario en la fila correspondiente
      datosUsuario.forEach((dato, columnIndex) => {
        sheet.cell(rowIndex + 8, columnIndex + 2).value(dato);
        sheet.cell(rowIndex + 8, columnIndex + 2).style({
          horizontalAlignment: "center",
          verticalAlignment: "center",
        });
      });
    });

    sheet
      .range("B3:C4")
      .value("Reporte de usuarios")
      .style({
        bold: true,
        horizontalAlignment: "center",
        verticalAlignment: "center",
      })
      .merged(true);

    sheet.cell("B4").value(new Date().toISOString().split("T")[0]);
    // Ajustar el ancho de las columnas
    sheet.column("B").width(10); // Ancho de la columna B
    sheet.column("C").width(30);
    sheet.column("D").width(20);
    sheet.column("E").width(25);
    sheet.column("F").width(20);
    sheet.column("G").width(20);
    sheet.column("H").width(30); // Ancho de la columna H (última columna con datos)

    sheet.row(7).height(20); // Ajustar el alto de la fila 7

    const sheetDispositivos = workbook.addSheet("Dispositivos");

    const dataDispositivos: any = await Dispositivo.findAll({
      include: [
        {
          model: Users,
        },
        {
          model: DetalleDispositivo,
        },
        {
          model: Sucursal,
          where: { nombre: { [Op.eq]: branch } },
          include: [
            { model: Empresa, where: { nombre: { [Op.eq]: company } } },
          ],
        },
      ],
    });
    const dataDevice = dataDispositivos.map(
      (item: { dataValues: any; DetalleDispositivo: any }) => ({
        ...item?.dataValues,
        ...item.DetalleDispositivo?.dataValues,
      })
    );
    res.json(dataDevice);

    // const Head = [
    //   "id",
    //   "codigo",
    //   "nombre",
    //   "Estado",
    //   "tipo",
    //   "Tipo de Dispositivo",
    //   "Marca",
    //   "Placa Marca",
    //   "Placa detalle",
    //   "Procesador Marca",
    //   "Procesador Modelo",
    //   "Cantidad de Ram",
    //   "Ram",
    //   "Cantidad de Disco Duro",
    //   "Disco Duro",
    //   "Tarjeta de Video",
    //   "Os",
    // ];

    // const keysDevice = [
    //   "id",
    //   "codigo_dispositivo",
    //   "nombre",
    //   "estado",
    //   "tipo",
    //   "tipo_Disp",
    //   "marca",
    //   "Placa_modelo",
    //   "Placa_detalle",
    //   "Procesador_marca",
    //   "Procesador_modelo",
    //   "Ram_cantidad",
    //   "Ram_Modulos",
    //   "Almacenamiento_canti",
    //   "Almacenamiento_detalle",
    //   "Tarjeta_Video",
    //   "Os",
    // ];

    const keys = Object.keys(dataDevice[0]);

    // Escribir los encabezados en la primera fila
    keys.forEach((key, index) => {
      sheetDispositivos.cell(1, index + 1).value(key);
      sheetDispositivos.cell(1, index + 1).style({
        bold: true,
        fill: "CCCCCC",
        horizontalAlignment: "center",
        verticalAlignment: "center",
      });
    });

    // Insertar datos de los dispositivos en la tabla
    dataDevice.forEach((dispositivo: any, rowIndex: number) => {
      // Insertar los valores de cada propiedad del objeto en la fila correspondiente
      keys.forEach((key, columnIndex) => {
        if (dispositivo[key] === null) dispositivo[key] = "No especificado";
        if (dispositivo[key] === Object(dispositivo[key]))
          dispositivo[key] = JSON.stringify(dispositivo[key]);

        sheetDispositivos
          .cell(rowIndex + 2, columnIndex + 1)
          .value(dispositivo[key]);
        sheetDispositivos.cell(rowIndex + 2, columnIndex + 1).style({
          horizontalAlignment: "center",
          verticalAlignment: "center",
        });
      });
    });

    // Guardar el archivo Excel
    await workbook.toFileAsync("plantilla_usuarios.xlsx");
    console.log("Plantilla de usuarios creada correctamente.");
  } catch (error: any) {
    console.log("error-excel-inventory", error);
    res.json({ error: true, message: error, messageServer: error?.message });
  }
}
