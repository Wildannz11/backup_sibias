import { Sequelize } from "sequelize";
import dbConfig from "./db.config.js";

const db = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
});

export default db;