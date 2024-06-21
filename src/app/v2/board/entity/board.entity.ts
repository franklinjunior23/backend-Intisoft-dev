import { Optional } from "sequelize";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import ListEntity from "./List.entity";


type boardAttributes = {
  id: string;
  name: string;
  description?: string | null;
  lists?: ListEntity[];

};

type boardCreation = Optional<boardAttributes, "id">;


@Table({
  tableName: "board",
  modelName: "Board",
  timestamps: true,
})
class BoardEntity extends Model<BoardEntity, boardCreation> {
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

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare description: string | null;

  @HasMany(() => ListEntity)
  declare lists: ListEntity[];

 
}

export default BoardEntity;
