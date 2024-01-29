import { Op } from "sequelize";
import Dispositivo from "../models/Dispositvo";
import { Request, Response } from "express";
import Users from "../models/Users";
import Sucursal from "../models/Sucursales";
import Empresa from "../models/Empresa";
import DetalleDispositivo from "../models/DetalleComponents";
import CreateNotify from "../utils/CreateNotify";
import { generarCodigo } from "../utils/CodigoDisp";
import { Area, Sucursales } from "../models";

export const GetPcYLap = async (req: Request, res: Response): Promise<void> => {
  try {
    const Data = await Dispositivo.findAll({
      where: {
        tipo: {
          [Op.in]: ["PC", "LAPTOP"],
        },
        IdUser: null,
      },
      include: [
        {
          model: Users,
        },
      ],
    });
    res.json(Data);
  } catch (error) {
    res.status(500).json({ error });
    console.log(error);
  }
};

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

    const { Ram_Modulos, Almacenamiento } = data;
    if (Ram_Modulos || Almacenamiento) {
      const DatosProx = {
        Ram_cantidad: Ram_Modulos.length,
        Ram_Modulos: Ram_Modulos,
        Almacenamiento_canti: Almacenamiento.length,
        Almacenamiento_detalle: Almacenamiento,
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
    console.log(error);
  }
};

export const GetsDispositivos = async (req: Request, res: Response) => {
  try {
    const { empresa, sucursal } = req.query;
    if (empresa && sucursal == undefined) {
      throw new Error("Error Parametros");
    }
    console.log(empresa, sucursal);
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
    const DatsNew = req.body;

    const DataDispositivo: any = await Dispositivo.findByPk(id, {
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
    const DataDetalleDisp: any = await DetalleDispositivo.findOne({
      where: { IdDispositivo: id },
    });

    if (DataDispositivo.Areas.length == 0 && DatsNew.FormArea) {
      const Areas: any = await Area.findByPk(DatsNew.IdArea);
      await Areas.addDispositivo(DataDispositivo.id);
    }

    const CamposUpd: any = {};
    for (const CampUpdate in DatsNew) {
      if (DataDispositivo[CampUpdate] !== DatsNew[CampUpdate]) {
        CamposUpd[CampUpdate] = DatsNew[CampUpdate];
      }
    }

    if (!DatsNew.IdUser || DatsNew.IdUser === "null") {
      CamposUpd.IdUser = null;
    }

    await DataDispositivo.update(CamposUpd);

    const Campos: any = {};
    for (const CampUpdate in DatsNew) {
      if (DataDetalleDisp[CampUpdate] !== DatsNew[CampUpdate]) {
        Campos[CampUpdate] = DatsNew[CampUpdate];
      }
    }

    Campos.Almacenamiento_detalle = Campos.Almacenamiento;
    await DataDetalleDisp.update(Campos);
    await CreateNotify(
      `Se ha actualizado el dispositivo "${DataDispositivo?.nombre}" de la empresa ${DataDispositivo?.Sucursale.Empresa.nombre} y sucursal ${DataDispositivo?.Sucursale.nombre}`,
      req.User?.nombre,
      req.User?.id
    );

    return res.json({ update: true, message: "Se actualizo correctamente" });
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
    console.log(id);
    const Exist = await Dispositivo.findOne({
      where: {
        id,
      },
      include: [
        { model: DetalleDispositivo },
        { model: Users },
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
    const { TokenSucursal, IdDispositivo } = req.body;

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
    const CreateDisp: any = await Dispositivo.create({
      estado: "Activo",
      IdSucursal: Busq?.id,
      Agent: true,
    });
    await CreateDisp.update({
      codigo_dispositivo: generarCodigo(
        Busq?.Empresa?.nombre,
        Busq?.nombre,
        CreateDisp.id
      ),
    });
    return res.json({
      auth: true,
      message: `Token Correcto , Empresa : ${Busq?.Empresa?.nombre} , Sucursal : ${Busq?.nombre}`,
      Id: CreateDisp.id,
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
export const CreateDispAgent = async (req: Request, res: Response) => {
  try {
    const { IdDipositivo, ...datos } = req.body;

    if (!IdDipositivo)
      return res.json({ error: true, message: "Hubo un error" });

    const Busq: any = await Dispositivo.findByPk(Number(IdDipositivo));
    Busq?.update({
      nombre: datos?.osInfo?.hostname,
      tipo: datos?.battery?.hasBattery ? "Laptop" : "Pc",
    });
    const BusqDetalleComponent: any = await DetalleDispositivo.findOne({
      where: { IdDispositivo: { [Op.eq]: IdDipositivo } },
    });
    const GraphisDats = datos.graphics.controllers.map((value: any) => {
      const bus = value.bus;
      const vram = value.vram + "GB";
      const modelo = value.model;
      const detalle = value.vendor;
      return {
        bus,
        vram,
        modelo,
        detalle,
      };
    });
    const DataMemory = datos.memLayout.map((value: any, index: number) => {
      const mhz = value.clockSpeed.toString();
      const tipo = value.type;
      const serial = value.partNum;
      const gb = value.size / Math.pow(1024, 3) + "GB";
      const marca =
        BusqDetalleComponent?.Ram_Modulos[index]?.marca ?? "Unknown";
      return {
        mhz: mhz,
        tipo: tipo,
        marca: marca,
        serial,
        gb,
      };
    });
    const Datadisc = datos.blockDevices
      .filter((value: any) => value.physical !== "Removable")
      .map((value: any, index: number) => {
        const gb = (value.size / Math.pow(1024, 3)).toFixed(2);
        const estado = value.physical;
        const serial = value.serial;
        const tipo =
          BusqDetalleComponent?.Almacenamiento_detalle[index]?.tipo ?? "";
        const marca = value.serial;
        return {
          gb: `${gb} GB`,
          tipo,
          marca,
          estado,
          serial,
        };
      });
    if (BusqDetalleComponent === null) {
      await DetalleDispositivo.create({
        IdDispositivo: IdDipositivo,
        Config_mac: datos?.networkInterfaces[0]?.mac,
        Config_ip: datos?.networkInterfaces[0]?.ip4,
        Placa_detalle: datos?.baseboard.model,
        Procesador_marca: datos?.cpu?.manufacturer,
        Procesador_modelo: datos?.cpu?.brand,
        Ram_cantidad: datos?.memLayout.length,
        Ram_Modulos: DataMemory,
        Almacenamiento_canti: datos.blockDevices.length,
        Almacenamiento_detalle: Datadisc,
        Tarjeta_Video: GraphisDats,
      });
      return res.json({
        message: `Dispositivo Actualizado Id:${IdDipositivo}`,
      });
    }
    BusqDetalleComponent.update({
      Config_mac: datos?.networkInterfaces[0]?.mac,
      Config_ip: datos?.networkInterfaces[0]?.ip4,
      Placa_modelo: BusqDetalleComponent.Placa_modelo,
      Placa_detalle: datos?.baseboard.model,
      Ram_cantidad: datos?.memLayout.length,
      Ram_Modulos: DataMemory,
      Almacenamiento_canti: datos.blockDevices.length,
      Almacenamiento_detalle: Datadisc,
      Tarjeta_Video: GraphisDats,
    });

    res.json({ message: `Dispositivo Actualizado Id:${IdDipositivo}` });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
