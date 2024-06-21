import { Optional } from "sequelize";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import ListEntity from "./List.entity";
import { Status } from "../enum/status.enum";
import Sucursal from "../../../models/Sucursales";

type cardAttributes = {
  id: string;
  title: string;
  description?: string;
  files: Array<any> | null;
  task: Array<any> | null;
  status: Status;
  dueDate: Date | null;
  newDueDate: Date | null;

  // branchs : typeof Sucursal | null;

  deletedAt: Date | null;
  listId: string | null;
};
type cardCreation = Optional<cardAttributes, "id">;

@Table({
  tableName: "card",
  modelName: "Card",
  timestamps: true,
})
class CardEntity extends Model<CardEntity, cardCreation> {
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
  declare title: string;

  @Column({
    type: DataType.STRING,
  })
  declare description: string;

  @Column({
    type: DataType.JSON,
  })
  declare files: Array<any>;

  @Column({
    type: DataType.JSON,
  })
  declare task: Array<any>;

  @Column({
    type: DataType.ENUM,
    values: Object.values(Status),
    defaultValue: Status.PENDING,
  })
  declare status: Status;

  @Column({
    type: DataType.DATE,
  })
  declare dueDate: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: null,
  })
  declare newDueDate: Date;

  @Column({
    type: DataType.DATE,
    defaultValue: null,
  })
  declare deletedAt: Date;

  @ForeignKey(() => ListEntity)
  @Column({
    type: DataType.STRING,
  })
  declare listId: string;

  @BelongsTo(() => ListEntity)
  declare list: ListEntity;
}

export default CardEntity;
