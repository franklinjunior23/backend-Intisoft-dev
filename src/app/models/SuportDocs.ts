import { Optional } from "sequelize";
import { sequelize } from "../config/database";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import FolderKnowledge from "./FolderKnowledge";

type knowledgeAtributtes = {
  id?: string;
  Titulo: string;
  Contenido: string;
  Categoria: string | string[] | null;
  Archivos?: Array<any> | null;
  Comentarios?: Array<any> | null;
  Autor?: string;
  Calificacion?: number | null;
  folderId: string | null;
};
type KnowledgeCreation = Optional<knowledgeAtributtes, "id">;

@Table({
  tableName: "suportDocs",
  modelName: "Knowledge",
  timestamps: true,
})
class Knowledge extends Model<knowledgeAtributtes, KnowledgeCreation> {
  @Column({
    unique: true,
    primaryKey: true,
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
  })
  declare id?: string;

  @Column({
    type: DataType.STRING,
  })
  declare Titulo: string;

  @Column({
    type: DataType.TEXT,
  })
  declare Contenido: string;

  @Column({
    type: DataType.TEXT,
    get() {
      return JSON?.parse(this?.getDataValue("Categoria"));
    },

  })
  declare Categoria: string;

  @Column({
    type: DataType.JSON,
  })
  declare Archivos?: Array<any>;

  @Column({
    type: DataType.JSON,
  })
  declare Comentarios?: Array<any>;

  @Column({
    type: DataType.STRING,
  })
  declare Autor: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare Calificacion?: number;

  @ForeignKey(() => FolderKnowledge)
  @Column({})
  declare folderId: string;

  @BelongsTo(() => FolderKnowledge)
  declare folder: FolderKnowledge;
}
export default Knowledge;

// export const SuportDocs = sequelize.define("suportDocs", {
//   id: {
//     type: DataType.UUID,
//     defaultValue: uuidv4,
//     primaryKey: true,
//   },
//   Titulo: {
//     type: DataType.STRING,
//   },
//   Contenido: {
//     type: DataType.TEXT,
//   },
//   Categoria: {
//     type: DataType.TEXT,
//     get() {
//       return JSON.parse(this?.getDataValue("Categoria"));
//     },
//     set(val) {
//       this?.setDataValue("Categoria", JSON.stringify(val));
//     },
//   },
//   Archivos: {
//     type: DataType.JSON,
//   },
//   Comentarios: {
//     type: DataType.JSON,
//   },
//   Autor: {
//     type: DataType.STRING,
//   },
//   Calificacion: {
//     type: DataType.INTEGER,
//   },
// });
