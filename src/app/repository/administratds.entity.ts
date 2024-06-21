import { Optional } from "sequelize";
import {
  BelongsTo,
  Column,
  DataType,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript";
import RoleEntity from "./role.entity";

type AdministradoresTypes = {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  usuario: string;
  contraseña: string;
  id_rol?: number | null;
  role?: RoleEntity | null;
  isBlocked?: boolean | null;
  lock_date?: string | null;
  login_attempts?: number | null;
  last_login_attempt?: string | null;
  isActive?: boolean | null;
  estado?: boolean;
};

type AdministradoresCreation = Optional<AdministradoresTypes, "id">;

@Table({
  tableName: "Administradores",
  modelName: "administrators",
  timestamps: true,
})
class AdministradoresEntity extends Model<
  AdministradoresEntity,
  AdministradoresCreation
> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare nombre: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare apellido: string;

  @Column({
    type: DataType.STRING,
  })
  declare correo: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare usuario: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare contraseña: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare isBlocked: boolean;

  @Column({
    type: DataType.STRING,
  })
  declare lock_date: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: 0,
  })
  declare login_attempts: number | null;

  @Column({
    type: DataType.STRING,
  })
  declare last_login_attempt: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare isActive: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  declare estado: boolean;

  @Column({
    type: DataType.INTEGER,
  })
  declare id_rol: number;

  @HasOne(() => RoleEntity)
  declare role: RoleEntity;
}

export default AdministradoresEntity;
