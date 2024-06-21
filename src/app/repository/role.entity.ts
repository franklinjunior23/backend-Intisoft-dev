import { Optional } from "sequelize";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import AdministradoresEntity from "./administratds.entity";

type roleTypes = {
  id: number;
  name: roleNames;
  userId?: number;
  user?: AdministradoresEntity;
};
export enum roleNames {
  ADMIN = "Administrador",
  CLIENT = "Cliente",
  SOPORTE = "Soporte",
}

type roleCreation = Optional<roleTypes, "id">;

@Table({
  tableName: "Roles",
  modelName: "Role",
  timestamps: true,
})
class RoleEntity extends Model<RoleEntity, roleCreation> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  declare id: number;

  @Column({
    type: DataType.ENUM,
    values: Object.values(roleNames),
    defaultValue: roleNames.CLIENT,
  })
  declare name: roleNames;

  @ForeignKey(() => AdministradoresEntity)
  declare userId: number;

  @BelongsTo(() => AdministradoresEntity)
  declare user: AdministradoresEntity;
}
export default RoleEntity;
