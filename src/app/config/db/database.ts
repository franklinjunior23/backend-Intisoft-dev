import "dotenv/config";
import { config } from "dotenv";
import { Sequelize } from "sequelize-typescript";
import FolderKnowledge from "../..//models/FolderKnowledge";
import Knowledge from "../..//models/SuportDocs";
import BoardEntity from "../../v2/board/entity/board.entity";
import ListEntity from "../../v2/board/entity/List.entity";
import CardEntity from "../../v2/board/entity/card.entity";
import AdministradoresEntity from "../../repository/administratds.entity";
import RoleEntity from "../../repository/role.entity";

const env = process.env.NODE_ENV || "development";
config({
  path: `.env.${env}`,
});

export const sequelize = new Sequelize({
  database: process.env.DBNAME,
  dialect: "mysql",
  username: process.env.DBUSER,
  password: String(process.env.DBPASSWORD),
  host: process.env.HOST,
  port: Number(process.env.DBPORT || "3306"),
  models: [AdministradoresEntity,RoleEntity,],
  logging: false,
  timezone: "-05:00",
});
// FolderKnowledge, Knowledge, BoardEntity, ListEntity, CardEntity