import SuportDocs from "../models/SuportDocs";
import { Request, Response } from "express";
import CreateNotify from "../utils/CreateNotify";
import Knowledge from "../models/SuportDocs";
import FolderKnowledge from "../models/FolderKnowledge";
import { Op } from "sequelize";
import Cloudinary from "../services/Cloudinary";

export const GetBaseConocimientos = async (req: Request, res: Response) => {
  try {
    const elements_knowledge = [
      "id",
      "Titulo",
      "Categoria",
      "createdAt",
      "updatedAt",
      "Autor",
    ];
    const data = await FolderKnowledge.findAll({
      where: { parentId: { [Op.eq]: null } },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: FolderKnowledge,
          as: "subfolders",
          include: [
            {
              model: Knowledge,
              attributes: elements_knowledge,
              as: "knowledges",
            },
            {
              model: FolderKnowledge,
              as: "subfolders",
              include: [
                {
                  model: Knowledge,
                  as: "knowledges",
                  attributes: elements_knowledge,
                },
              ],
            },
          ],
        },
        { model: Knowledge, as: "knowledges", attributes: elements_knowledge },
      ],
    });

    return res.json({ details: { cantidad: data?.length }, data });
  } catch (error: any) {
    return res.status(401).json({ error, mesage: error?.message });
  }
};

export const GetDeleteKnowledge = async (req: Request, res: Response) => {
  try {
    const data = await FolderKnowledge.findAll({
      where: { delete: { [Op.ne]: null } },
      paranoid: false,
      order: [["delete", "DESC"]],
      include: [
        {
          model: FolderKnowledge,
          as: "subfolders",
          paranoid: false,
          include: [
            {
              model: Knowledge,
              as: "knowledges",
              paranoid: false,
            },
            {
              model: FolderKnowledge,
              as: "subfolders",
              paranoid: false,
              include: [
                {
                  model: Knowledge,
                  as: "knowledges",
                  paranoid: false,
                },
              ],
            },
          ],
        },
        {
          model: Knowledge,
          as: "knowledges",
          paranoid: false,
        },
      ],
    });
    const { count } = await FolderKnowledge.findAndCountAll({
      where: { delete: { [Op.ne]: null } },
      paranoid: false,

      include: [
        {
          model: FolderKnowledge,
          as: "subfolders",
          paranoid: false,
          include: [
            {
              model: Knowledge,
              as: "knowledges",
              paranoid: false,
            },
            {
              model: FolderKnowledge,
              as: "subfolders",
              paranoid: false,
              include: [
                {
                  model: Knowledge,
                  as: "knowledges",
                  paranoid: false,
                },
              ],
            },
          ],
        },
        {
          model: Knowledge,
          as: "knowledges",
          paranoid: false,
        },
      ],
    });

    return res.json({ data, count });
  } catch (error: any) {
    return res.status(401).json({ error, mesage: error?.message });
  }
};

export const CreateBaseConocimiento = async (req: any, res: Response) => {
  try {
    const Dats = req.body;
    const UserCreate = req.User.nombre;
    const files = req?.files;

    if (UserCreate == null || "")
      return res.json({
        create: false,
        message: "Solamente los Soportes pueden acceder a ello",
      });

    const data: any = await SuportDocs.create({
      ...Dats,
      Autor: UserCreate,

      Archivos: files ? [...files] : null,
    });

    if (!data) {
      return res.json({ create: false, message: "No se creo correctamente" });
    }
    await CreateNotify(
      `¡Nuevo documento en la base de conocimiento! Título: "${data?.Titulo}"`,
      UserCreate,
      req.User?.id
    );

    return res.status(200).json({
      message: "Se creo correctamente",
      create: true,
    });
  } catch (error: any) {
    return res.json({ create: false, message: error?.message });
  }
};
export const UpdateById = async (req: any, res: Response) => {
  const idArticle = req.params.id;

  type databody = {
    Titulo: string;
    Contenido: string;
    Categoria: string[];
    Archivos: any[] | undefined;
    imageAfter: string | any;
  };

  const Data: databody = req.body;
  const image = req.files && req.files["image"] ? req.files["image"] : null;
  console.log(image)

  // conversion JSON string to JSON
  Data.imageAfter = JSON.parse(Data.imageAfter as string);

  function DetectUpdateImages(
    DataArticleFiles: any[] | undefined,
    AfterFIles: string[],
    setdataUpdate: any[]
  ) {
    DataArticleFiles?.forEach((element: any) => {
      const existsInImageAfter = AfterFIles.some(
        (element2: any) => element.public_id === element2.public_id
      );

      if (!existsInImageAfter) {
        setdataUpdate.push(element.public_id);
      }
    });
  }

  try {
    const article: Knowledge | null = await Knowledge.findByPk(idArticle);

    if (!article)
      return res
        .status(404)
        .json({ update: false, message: "No se encontro el registro" });

    let imagesUpload: any[] | null | unknown | any;
    let ImagesRemove: string[] = [];

    if (Data.Archivos && Data.imageAfter.length === 0) {
      ImagesRemove =
        article.Archivos?.map((element: any) => element.public_id) ?? [];

      if (ImagesRemove) await Cloudinary.deleteImages(ImagesRemove);
      Data.Archivos = [];
    } else {
      DetectUpdateImages(article.Archivos, Data.imageAfter, ImagesRemove);
      if (ImagesRemove) await Cloudinary.deleteImages(ImagesRemove);
      Data.Archivos = Data.imageAfter;
    }

    if (image) {
      // Verificar si el artículo no tiene archivos asociados
      if (!article.Archivos || article.Archivos.length === 0) {

        // Subir nuevas imágenes
        imagesUpload = await Cloudinary.uploadImages(image);

        if (!imagesUpload) {
          return res.json({
            error: true,
            message: "Error en la creación de la imagen",
          });
        }

        // Mapear las imágenes subidas a la estructura deseada
        Data.Archivos = imagesUpload.map((file: any) => ({
          url: file.secure_url,
          public_id: file.public_id,
          type: file.format,
        }));

        imagesUpload = null;
      } else {
        // Si el artículo ya tiene archivos asociados

        // Subir nuevas imágenes
        const updateImagesNew: any = await Cloudinary.uploadImages(image);

        if (!updateImagesNew) {
          return res.json({
            error: true,
            message: "Error en la creación de la imagen",
          });
        }

        // Mapear las imágenes subidas a la estructura deseada
        const newImages = updateImagesNew.map((file: any) => ({
          url: file.secure_url,
          public_id: file.public_id,
          type: file.format,
        }));

        // Unir los nuevos archivos con los existentes en Data.Archivos
        const unitedData = [...(Data.imageAfter || []), ...newImages];

        Data.Archivos = unitedData;
      }
    }

    const updatearticle = await article.update({
      Archivos: Data.Archivos,
      Titulo: Data.Titulo,
      Contenido: Data.Contenido,
      Categoria: Data.Categoria,
    });

    return res.json({
      ok: true,
      message: "Se actualizó correctamente",
      data: updatearticle,
    });
  } catch (error: any) {
    console.log(error?.message);
    return res.json({ error: true, message: "Error en el servidor" });
  }
};

export const GetBaseConocById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.json({ error: true, message: "Falta datos" });
  try {
    const data = await SuportDocs.findByPk(id);
    if (!data)
      return res.json({
        succes: true,
        error: true,
        search: false,
        message: "No se encontro el registro",
      });
    return res.json({ search: true, data, succes: true, error: false });
  } catch (error) {
    return res.json({ error: true, message: "Error en el servidor" });
  }
};

export class KnowledgeController {
  async CreateArticleBYFolder(req: any, res: Response) {
    type Article = {
      Titulo: string;
      Contenido: string;
      Categoria: string;
      folderId: string;
    };
    const databody: Article = req.body;
    const { folderId } = req.params;
    const image = req.files && req.files["image"] ? req.files["image"] : null;

    if (!databody || !folderId)
      return res.json({ error: true, message: "Falta datos" });

    if (image) {
      var succesuploadFiles: any = await Cloudinary.uploadImages(image);
      if (!succesuploadFiles) {
        return res.json({
          ok: false,
          error: true,
          message: `Error en la creacion del articulo  ${databody.Titulo}`,
        });
      }
      if(!Array.isArray(succesuploadFiles)){
        succesuploadFiles = [succesuploadFiles]
      }
      var DataFiles = succesuploadFiles?.map((file: any) => {
        return {
          url: file.secure_url,
          public_id: file.public_id,
          type: file.format,
        };
      });
    }

    const folder: FolderKnowledge | null = await FolderKnowledge.findByPk(
      folderId
    );

    if (!folder)
      return res
        .status(404)
        .json({ ok: false, message: "No se encontro la carpeta" });

    const newArticle = await Knowledge.create({
      Autor: req?.user?.datos?.nombre,
      ...databody,
      Archivos: DataFiles ?? null,
      folderId: folder?.id,
    });

    return res.status(201).json({
      ok: true,
      create:true ,
      data: newArticle,
      message: `Se creo correctamente el articulo "${newArticle.Titulo}" en la carpeta "${folder.name}"`,
    });
  }
  async CreateFolder(req: Request, res: Response) {
    const { name, parentId } = req.body;

    if (!name && !parentId)
      return res.json({ create: false, message: "Faltan datos" });

    try {
      const data: FolderKnowledge = await FolderKnowledge.create({
        name: String(name),
        parentId: parentId ?? null,
      });

      if (!data)
        return res.json({
          create: false,
          message: "No se creo correctamente",
        });

      return res
        .status(201)
        .json({ create: true, data, message: "Se creo correctamente" });
    } catch (error: any) {
      console.log("error createfolder");
      res.json({ create: false, message: error?.message });
    }
  }
  async DeleteFolder(req: Request, res: Response) {
    const { id } = req.params;

    if (!id) return res.json({ succes: false, message: "No se encontro" });

    try {
      const data: FolderKnowledge | null = await FolderKnowledge.findByPk(id);

      if (!data) return res.json({ succes: false, message: "No se encontro" });

      const datadelete = await data.destroy();

      return res.json({
        succes: true,
        message: "Se elimino correctamente",
        data: datadelete,
      });
    } catch (error: any) {
      return res.json({ succes: false, message: error?.message });
    }
  }

  async RestaureFolder(req: Request, res: Response) {
    const { id } = req.params;

    const fetch: FolderKnowledge | null = await FolderKnowledge.findByPk(id, {
      paranoid: false,
    });

    if (!fetch) return res.json({ succes: false, message: "Not Found" });

    await fetch?.restore();

    return res.json({
      succes: true,
      message: `Se restauro correctamente la carpeta ${fetch.name}`,
    });
  }
  async UpdateFolder(req: Request, res: Response) {}
}
