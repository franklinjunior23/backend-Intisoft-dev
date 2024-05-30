import {
  BelongsTo,
  Column,
  DataType,
  DeletedAt,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Optional } from "sequelize";
import Knowledge from "./SuportDocs";
import { Col } from "@sequelize/core";

type FolderKnowledgeAttributes = {
  id: string;
  name: string;
  parentId?: string | null;
  parent?: FolderKnowledge;
  subfolders?: FolderKnowledge[];
  articles?: Knowledge[];
  delete?: Date | null;
};
type folderknowledgCreation = Optional<FolderKnowledgeAttributes, "id">;

@Table({
  tableName: "folderKnowledges",
  modelName: "FolderKnowledge",
  timestamps: true,
})
class FolderKnowledge extends Model<FolderKnowledge, folderknowledgCreation> {
  @Column({
    primaryKey: true,
    unique: true,
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @ForeignKey(() => FolderKnowledge)
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare parentId: string | null;

  @BelongsTo(() => FolderKnowledge)
  declare parent: FolderKnowledge | null;

  @HasMany(() => FolderKnowledge, { onUpdate: "CASCADE", onDelete: "CASCADE" })
  declare subfolders: FolderKnowledge[];

  @HasMany(() => Knowledge, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  declare knowledges: Knowledge[];

  @DeletedAt
  @Column({
    type: DataType.DATE,
    allowNull: true,
    onDelete: "CASCADE",
    defaultValue: null,
  })
  declare delete: Date | null;
}

export default FolderKnowledge;
