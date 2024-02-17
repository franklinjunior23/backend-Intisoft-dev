import { Op } from "sequelize";

import { Request, Response } from "express";

import { Dispositivo, Area, Users, Sucursales, Empresa } from "../models";

export const GetUsersByEmpresaAndSucursal = async (
  req: Request,
  res: Response
) => {
  try {
    const { empresa, sucursal } = req.params;

    const UserData: any = await Users.findAll({
      include: [
        {
          model: Sucursales,
          where: {
            nombre: { [Op.eq]: sucursal },
          },
          include: [
            {
              model: Empresa,
              where: {
                nombre: { [Op.eq]: empresa },
              },
            },
          ],
        },
        {
          model: Dispositivo,
        },
      ],
    });
    return res.json(UserData);
  } catch (error) {
    res.json(error);
  }
};
export const CreateUserBySucursal = async (req: Request, res: Response) => {
  try {
    const { empresa, sucursal } = req.params;
    const datoUser = req.body;
    console.log(datoUser);
    const resSuc: any = await Sucursales.findOne({
      where: {
        nombre: {
          [Op.eq]: sucursal,
        },
      },
      include: [
        {
          model: Empresa,
          where: {
            nombre: { [Op.eq]: empresa },
          },
        },
      ],
    });
    console.log(resSuc);
    if (resSuc) {
      if (resSuc?.IdArea > 0) {
        console.log("area es mayr de 0");
      }
      const CreateUser: any = await Users.create({
        ...datoUser,
        IdSucursal: resSuc?.id,
      });

      const AreaDat: any = await Area.findByPk(Number(datoUser?.IdArea));
      await AreaDat.addUser(CreateUser?.id);
      return res.json({ create: true, body: CreateUser });
    }
    return res.json({ create: false });
  } catch (error) {}
};

export const GetUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const resp = await Users.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Dispositivo,
        },
        { model: Area },
      ],
    });
    if (!resp) return res.json({ where: false });
    res.json({ where: true, resp });
  } catch (error) {
    res.json(500).json(error);
  }
};

export const DeleteUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const Exist = await Users.findOne({
      where: { id },
    });
    console.log(id);
    if (Exist) {
      await Users.destroy({
        where: {
          id,
        },
      });
      return res.json({ search: true });
    }
    res.json({ search: false });
  } catch (error) {
    console.log(error);
  }
};
export const UpdateUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(`Este Es el ide del usuario : ${id}`)
    const newDatos = req.body;
    const exist: any = await Users.findByPk(id, { include: Area });
    console.log(exist)
    console.log(newDatos)
    if (!exist) {
      return res.json({ search: false });
    }

    // // Verificar si el usuario tiene áreas asociadas
    // if (exist?.Areas?.length === 0) {
    //   const areaDat: any = await Area.findByPk(Number(newDatos?.IdArea));
    //   await areaDat?.addUsers(id);
    // }

    // Verificar si el área del usuario ha cambiado
    console.log(newDatos?.IdArea != exist?.Areas?.id)
    if (newDatos?.IdArea != exist?.Areas?.id && exist?.Areas?.length != 0) {
      const beforeArea: any = await Area.findByPk(Number(exist?.Areas[0]?.id));
      await exist.removeArea(beforeArea);
      const areaDat: any = await Area.findByPk(Number(newDatos?.IdArea));
      await areaDat?.addUser(Number(id));
    }

    // Identificar cambios en los datos
    const cambios: any = {};
    for (const camposUpdate in newDatos) {
      if (exist[camposUpdate] !== newDatos[camposUpdate]) {
        cambios[camposUpdate] = newDatos[camposUpdate];
      }
    }

    // Actualizar el usuario con los cambios
    await exist.update(cambios);

    res.json({ search: true, data: exist, cambios });
  } catch (error: any) {
    console.error(error);
    return res.json({ error: true, message: error.message });
  }
};
export const GetsUserDisp = async (req: Request, res: Response) => {
  try {
    const { empresa, sucursal } = req.query;

    const resp = await Users.findAll({
      include: [
        {
          model: Sucursales,
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
          model: Dispositivo,
        },
        {
          model: Area,
        },
      ],
    });
    res.json(resp);
  } catch (error) {
    console.log(error);
  }
};
