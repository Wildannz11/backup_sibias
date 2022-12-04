import { Sequelize } from "sequelize";
import dbConfig from "./db.config.js";

const db = new Sequelize(`${dbConfig.dialect}://${dbConfig.USER}:${dbConfig.PASSWORD}@${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`
    // {
    // // dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    // // host: dbConfig.HOST,
    // // port: dbConfig.PORT,
    // // dialect: dbConfig.dialect,
    // }
);

// pakai ini buat running di localhost
// const db = new Sequelize('auth_db', 'root', '', {
//     host: "localhost",
//     dialect: "mysql"
// });

export default db;