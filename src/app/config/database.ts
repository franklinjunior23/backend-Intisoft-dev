import "dotenv/config";
import { config } from "dotenv";
import { Sequelize } from "sequelize-typescript";
import FolderKnowledge from "../models/FolderKnowledge";
import Knowledge from "../models/SuportDocs";

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
  models: [FolderKnowledge, Knowledge],
  logging: false,
  timezone: "-05:00",
});
