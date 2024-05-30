import { Op, where } from "sequelize";
import { Request, response, Response } from "express";
import Users from "../models/Users";
import Sucursal from "../models/Sucursales";
import Empresa from "../models/Empresa";
import DetalleDispositivo from "../models/DetalleComponents";
import CreateNotify from "../utils/CreateNotify";
import { generarCodigo } from "../utils/CodigoDisp";
import { Area, Sucursales, Dispositivo } from "../models";
import History_device from "../models/history-device";

export const CreateDisp = async (req: any, res: Response) => {
  try {
    const { empresa, sucursal } = req.params;
    const data = req.body;

    const EmpresaBySucursal = await Sucursal.findOne({
      where: {
        nombre: sucursal,
      },
      include: [
        {
          model: Empresa,
          where: {
            nombre: empresa,
          },
        },
      ],
    });

    if (!EmpresaBySucursal) return res.json({ search: false });

    const EmpresaSearch: any = await Sucursal.findOne({
      where: {
        nombre: sucursal,
      },
      include: [{ model: Empresa, where: { nombre: empresa } }],
    });

    const { Ram_Modulos, Almacenamiento_detalle } = data;
    if (Ram_Modulos || Almacenamiento_detalle) {
      const DatosProx = {
        Ram_cantidad: Ram_Modulos?.length,
        Ram_Modulos: Ram_Modulos,
        Almacenamiento_canti: Almacenamiento_detalle?.length,
        Almacenamiento_detalle: Almacenamiento_detalle,
      };

      if (data?.IdUser == "" || "null") {
        const CreateDisp: any = await Dispositivo.create({
          ...data,
          IdSucursal: EmpresaSearch?.id,
          IdUser: null,
        });
        const codigo_dispositivo = generarCodigo(
          empresa,
          sucursal,
          CreateDisp.id
        );
        await Dispositivo.update(
          { codigo_dispositivo },
          { where: { id: CreateDisp.id } }
        );

        const CreatComponDisp = await DetalleDispositivo.create({
          IdDispositivo: CreateDisp.id,
          ...data,
          ...DatosProx,
        });

        if (CreateDisp && CreatComponDisp) {
          await CreateNotify(
            `Se ha creado un nuevo dispositivo en la empresa "${empresa}" y sucursal "${sucursal}". Detalles del dispositivo: Tipo: ${CreateDisp?.tipo}, Nombre: ${CreateDisp.nombre}.`,
            req.User?.nombre,
            req.User?.id
          );
          return res.json({ create: true });
        }
      }
    }

    const respCreat: any = await Dispositivo.create({
      ...data,
      IdSucursal: EmpresaSearch?.id,
    });
    await DetalleDispositivo.create({ ...data, IdDispositivo: respCreat?.id });
    return res.json({ create: true });
  } catch (error) {
    res
      .status(500)
      .json({ error: true, message: "Error al crear el dispositivo" });
    console.log(error);
  }
};

export const GetsDispositivos = async (req: Request, res: Response) => {
  try {
    const { empresa, sucursal } = req.query;
    if (empresa && sucursal == undefined) {
      throw new Error("Error Parametros");
    }
    const Busq = await Dispositivo.findAll({
      include: [
        {
          model: DetalleDispositivo,
        },
        {
          model: Sucursal,
          where: { nombre: sucursal },
          include: [{ model: Empresa, where: { nombre: empresa } }],
        },
      ],
    });
    res.json(Busq);
  } catch (error) {
    res.json({ error });
  }
};

export const UpdateDisp = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const newDeviceData = req.body;

    const deviceData: any = await Dispositivo.findByPk(id, {
      include: [
        { model: Sucursal, include: [{ model: Empresa }] },
        {
          model: Area,
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!deviceData) {
      return res
        .status(404)
        .json({ error: true, message: "Dispositivo no encontrado" });
    }

    enum ShareType {
      Area = "Area",
      User = "User",
    }
    if (newDeviceData?.Share?.type === ShareType.Area) {
      const AreaData: any = await Area.findByPk(
        Number(newDeviceData?.Share.id)
      );
      await AreaData?.addDispositivo(Number(id));
    }
    if (newDeviceData?.Share?.type === ShareType.User) {
      await Dispositivo.update(
        {
          IdUser: newDeviceData?.Share.id,
        },
        {
          where: { id },
        }
      );
      const UserData: any = await Users.findByPk(
        Number(newDeviceData?.Share.id)
      );
    }

    const deviceDetailsData: any = await DetalleDispositivo.findOne({
      where: { IdDispositivo: id },
    });

    if (newDeviceData?.isHistory) {
      await History_device.create({
        action: JSON.parse(newDeviceData?.History),
        device: id,
      });
    }

    const updatedFields: any = {};
    for (const field in newDeviceData) {
      if (deviceData[field] !== newDeviceData[field]) {
        updatedFields[field] = newDeviceData[field];
      }
    }

    await deviceData.update({
      ...updatedFields,
      codigo_dispositivo: newDeviceData?.Codigo,
    });

    const detailFields: any = {};
    for (const field in newDeviceData) {
      if (deviceDetailsData[field] !== newDeviceData[field]) {
        detailFields[field] = newDeviceData[field];
      }
    }

    detailFields.Almacenamiento_detalle = detailFields.Almacenamiento_detalle;
    await deviceDetailsData.update(detailFields);

    await CreateNotify(
      `Se ha actualizado el dispositivo "${deviceData?.nombre}" de la empresa ${deviceData?.Sucursale.Empresa.nombre} y sucursal ${deviceData?.Sucursale.nombre}`,
      req.User?.nombre,
      req.User?.id
    );

    return res.json({
      succes: true,
      update: true,
      message: "Se actualizo correctamente",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "Error al actualizar el dispositivo" });
  }
};
export const DeleteDisp = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ExistData = await Dispositivo.findOne({
      where: { id },
      include: [{ model: DetalleDispositivo }],
    });
    if (!ExistData) return res.json({ search: false });

    await Dispositivo.destroy({
      where: {
        id,
      },
    });

    res.json({ search: true });
  } catch (error) {
    res.json({ error: true, msg: error });
  }
};
export const GetsDispositivo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const Exist = await Dispositivo.findOne({
      where: {
        id,
      },
      include: [
        { model: DetalleDispositivo },
        {
          model: Users,
          attributes: [
            "id",
            "nombre",
            "apellido",
            "genero",
            "usuario",
            "contraseña",
            "cargo",
            "anydesk_id",
            "anydesk_contra",
          ],
        },
        {
          model: Area,
          through: {
            attributes: [],
          },
        },
      ],
    });
    return res.json({ data: Exist });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export const GetsDispUsingUser = async (req: Request, res: Response) => {
  try {
    const data = req.query;
    console.log(data);
    const { empresa, sucursal } = req.query;
    const resp = await Dispositivo.findAll({
      include: [
        {
          model: Sucursal,
          where: {
            nombre: sucursal,
          },
          include: [
            {
              model: Empresa,
              where: {
                nombre: empresa,
              },
            },
          ],
        },
        {
          model: Users,
        },
      ],
    });
    res.json(resp);
  } catch (error) {
    console.log(error);
  }
};

export const AuthDispAgent = async (req: Request, res: Response) => {
  try {
    const { TokenSucursal, IdDispositivo, nameDevice } = req.body;

    const Busq: any = await Sucursales.findOne({
      where: { Token: { [Op.eq]: TokenSucursal } },
      include: [
        {
          model: Empresa,
        },
      ],
    });

    if (!Busq)
      return res.json({ auth: false, message: "Error token de la sucursal" });

    const CreateDisp: Dispositivo = await Dispositivo.create({
      id: 0, // Add the "id" property with a default value
      estado: "Activo",
      IdSucursal: Number(Busq?.id),
      Agent: true,
      nombre: nameDevice,
    });

    await CreateDisp.update({
      codigo_dispositivo: generarCodigo(
        Busq?.Empresa?.nombre,
        Busq?.nombre,
        CreateDisp.dataValues.id
      ),
    });
    await DetalleDispositivo.create({
      IdDispositivo: CreateDisp.dataValues.id,
    });
    return res.json({
      auth: true,
      message: `Token Correcto , Empresa : ${Busq?.Empresa?.nombre} , Sucursal : ${Busq?.nombre}`,
      Id: CreateDisp.dataValues.id,
      Data_empresa: {
        Empresa: Busq?.Empresa?.nombre,
        Sucursal: Busq?.nombre,
      },
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
export const ResolveAuthDeviceAgent = async (req: Request, res: Response) => {
  const { CodDevice } = req.body;
};
interface bodyagent {
  IdDipositivo: string;
  osInfo: any;
  battery: any;
  graphics: any;
  memLayout: any;
  diskLayout: any;
  networkInterfaces: any;
  baseboard: any;
  cpu: any;
  users: any;
}

export const CreateDispAgent = async (req: Request, res: Response) => {
  try {
    const {
      IdDipositivo,
      baseboard,
      battery,
      diskLayout,
      cpu,
      graphics,
      memLayout,
      networkInterfaces,
      osInfo,
      users,
    }: bodyagent = req.body;

    console.log("llego", IdDipositivo);

    if (!IdDipositivo)
      return res.json({ error: true, message: "Hubo un error" });

    const Busq: any = await Dispositivo.findByPk(Number(IdDipositivo));

    if (!Busq)
      return res.json({ error: true, message: "Dispositivo no encontrado" });

    await Busq?.update({
      nombre: osInfo?.hostname,
      tipo: battery?.hasBattery ? "Laptop" : "Pc",
    });

    const details: any = await DetalleDispositivo.findOne({
      where: { IdDispositivo: { [Op.eq]: IdDipositivo } },
    });

    const graphicsdetails = graphics?.controllers.map((value: any) => {
      const bus = value?.bus;
      const vram = value?.vram;
      const modelo = value?.model;
      const detalle = value?.vendor;
      return {
        bus,
        vram,
        modelo,
        detalle,
      };
    });
    function ExistData(index: number, type: string, data: any) {
      if (data) {
        return data[index]?.type;
      }
      return "Unknown";
    }
    interface HistoryDevice {
      type: string;
      after: any;
      field: string;
      before: any;
    }
    /** Verificacion de la ram */
    // Verificacion si agrego memoria ram
    if (details?.Ram_Modulos?.ulength < memLayout?.length) {
      await History_device.create({
        action: {
          type: "Add",
          after: memLayout,
          field: "Ram_Modulos",
          before: details?.Ram_Modulos,
        },
        device: IdDipositivo,
      });
    }
    // Verificacion si elimino memoria ram
    if (details?.Ram_Modulos?.length > memLayout?.length) {
      await History_device.create({
        action: {
          type: "Remove",
          after: memLayout,
          field: "Ram_Modulos",
          before: details?.Ram_Modulos,
        },
        device: IdDipositivo,
      });
    }

    const memoryRam = memLayout?.map((value: any, index: number) => {
      const mhz = value?.clockSpeed.toString();
      const gb = value?.size / Math.pow(1024, 3) + "GB";

      let serial;
      let marca;
      let tipo;

      if (details?.Ram_Modulos) {
        serial = details?.Ram_Modulos[index]?.serial;
        marca = details?.Ram_Modulos[index]?.marca;
        tipo = details?.Ram_Modulos[index]?.tipo;
      } else {
        console.log("No hay datos");
        tipo = value?.type ?? "uknown";
        serial = value?.serialNum ?? "uknown";
        marca = value?.type ?? "Unknown";
      }

      return {
        mhz: mhz,
        tipo: tipo,
        marca: marca,
        serial,
        gb,
      };
    });
    const Datadisc = diskLayout
      ?.filter((value: any) => value?.interfaceType !== "USB")
      ?.map((value: any, index: number) => {
        const gb = (value?.size / Math.pow(1024, 3)).toFixed(2) + "GB";
        const estado = value?.interfaceType;
        const serial = value?.serialNum;
        let marca;
        let tipo;

        if (details?.Almacenamiento_detalle) {
          tipo =
            details?.Almacenamiento_detalle[index]?.tipo ?? value.type ?? "";
          marca =
            details?.Almacenamiento_detalle[index]?.marca ??
            value.vendor ??
            "Unknown";
        } else {
          tipo = value.type ?? "";
          marca = value.vendor ?? "Unknown";
        }

        return {
          gb,
          tipo,
          marca,
          estado,
          serial,
        };
      });

    await details.update({
      Config_mac: "",
      Config_ip: "",
      Placa_detalle: baseboard?.model,
      Procesador_marca:
        details?.Procesador_marca === null
          ? cpu?.vendor
          : details?.Procesador_marca,
      Procesador_modelo: cpu?.brand,
      Ram_cantidad: memoryRam?.length,
      Ram_Modulos: memoryRam,
      Almacenamiento_canti: Datadisc?.length,
      Almacenamiento_detalle: Datadisc,
      Tarjeta_Video: graphicsdetails,
      Os: osInfo,
      users,
    });

    res.json({ message: `Dispositivo Actualizado Id:${IdDipositivo}` });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: true, message: "Error al actualizar el dispositivo" });
  }
};

export async function DeleteAreaforDevice(req: Request, Res: Response) {
  const IdDevice = req.params.id;
  const IdArea = req.query.area;

  // Buscar el dispositivo por su ID
  const device = await Dispositivo.findByPk(Number(IdDevice));

  // Buscar el área por su ID
  const area: any = await Area.findByPk(Number(IdArea));

  if (!device || !area) {
    return Res.status(404).json({ error: "Dispositivo o Área no encontrados" });
  }

  // Desvincular el dispositivo del área
  await area.removeDispositivos(device);

  return Res.json({ message: "Dispositivo Desvinculado de la area" });
}

export async function UnlickUser(req: Request, Resp: Response) {
  const { id } = req.params;
  try {
    const Device = await Dispositivo.findByPk(Number(id));
    if (!Device)
      return Resp.status(404).json({
        error: true,
        message: "Dispositivo no encontrado",
      });
    await Device?.update({ IdUser: null });
    return Resp.json({ message: "Usuario Desvinculado" });
  } catch (error: any) {
    return Resp.json({
      error: true,
      message: "Error",
      errorMessage: error?.message,
    });
  }
}

export async function AddNoteToDisp(req: Request, Res: Response) {
  const { id } = req.params;
  const { notes }: { notes: Notes } = req.body;

  try {
    const Device: Dispositivo | null = await Dispositivo.findByPk(Number(id));

    if (!Device || !id || !notes) {
      return Res.status(404).json({ error: "Dispositivo no encontrado" });
    }
    notes.createdAt = new Date();

    if (!Device.dataValues.notes) {
      await Device?.update({ notes: [notes] });
      return Res.json({ message: "Nota agregada correctamente", create: true });
    }

    const note = Device.dataValues.notes || [];
    await Device?.update({
      notes: [notes, ...note],
    });

    return Res.json({ message: "Nota agregada correctamente", create: true });
  } catch (error: any) {
    return Res.status(500).json({
      error: error.message,
      message: error?.message,
    });
  }
}

export const UpdateNoteToDisp = async (req: Request, res: Response) => {
  const { id, idNote } = req.params;
  const { notes }: { notes: Notes } = req.body;
  try {
    // Buscar el dispositivo por ID
    const device: Dispositivo | null = await Dispositivo.findByPk(Number(id));

    // Verificar si el dispositivo existe
    if (!device) {
      return res.status(404).json({ error: "Dispositivo no encontrado" });
    }

    // Obtener las notas del dispositivo
    const currentNotes = device.dataValues.notes || [];

    // Buscar la nota a actualizar por su título
    const noteIndex = currentNotes.findIndex(
      (note: Notes) => note.title === idNote
    );
    // Verificar si la nota existe
    if (noteIndex === -1) {
      return res.status(404).json({ error: "Nota no encontrada" });
    }

    // Actualizar la nota
    currentNotes[noteIndex] = { ...currentNotes[noteIndex], ...notes };

    // Actualizar el dispositivo con las nuevas notas
    await Dispositivo.update({ notes: currentNotes }, { where: { id } });

    return res.json({
      message: "Nota actualizada correctamente",
      updated: true,
      succes: true,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: "Error interno del servidor",
      message: error.message,
    });
  }
};

export async function DeleteNoteForDevice(req: Request, Res: Response) {
  const { id, idNote } = req.params;
  try {
    const Device: Dispositivo | null = await Dispositivo.findByPk(Number(id));

    if (!Device) {
      return Res.status(404).json({ error: "Dispositivo no encontrado" });
    }

    if (!Device.dataValues.notes) {
      return Res.status(404).json({ error: "Nota no encontrada" });
    }

    const notes = Device.dataValues.notes || [];
    const noteIndex = notes.findIndex((note: Notes) => note.title === idNote);

    if (noteIndex === -1) {
      return Res.status(404).json({ error: "Nota no encontrada" });
    }

    // Eliminar la nota del array
    notes.splice(noteIndex, 1);

    // Actualizar el dispositivo con las notas actualizadas
    await Dispositivo.update({ notes }, { where: { id } });

    return Res.json({
      message: "Nota eliminada correctamente",
      delete: true,
      succes: true,
    });
  } catch (error: any) {
    return Res.status(500).json({
      error: "Error interno del servidor",
      message: error.message,
    });
  }
}

interface Notes {
  title: string;
  tag: Array<string>;
  description: string;
  createdAt: Date;
}
