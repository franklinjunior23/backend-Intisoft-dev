import { Optional } from "sequelize";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import BoardEntity from "./board.entity";
import CardEntity from "./card.entity";

type listAttributes = {
  id: string;
  name: string;
  position: number;
  boardId?: string | null;
  board?: BoardEntity;
  cards: CardEntity[];
};

type listCreation = Optional<listAttributes, "id">;

@Table({
  tableName: "list",
  modelName: "List",
  timestamps: true,
})
class ListEntity extends Model<listAttributes, listCreation> {
  @Column({
    primaryKey: true,
    unique: true,
    type: DataType.STRING,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare position: number;
  @ForeignKey(() => BoardEntity)
  @Column({
    type: DataType.STRING,
  })
  declare boardId: string;

  @BelongsTo(() => BoardEntity)
  declare board: BoardEntity;

  @HasMany(() => CardEntity)
  declare cards: CardEntity[]
}

export default ListEntity;
