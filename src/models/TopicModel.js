import { Sequelize } from "sequelize";
import db from "../config/db.js";

const {DataTypes} = Sequelize;
const Topics = db.define('topic',{
    // id:{
    //     type: DataTypes.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true
    // },
    toid:{ 
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        validate:{
            notEmpty: true
        }
    },
    nama_topic:{ 
        type: DataTypes.STRING, 
        allowNull: true,
        validate:{
            notEmpty: true,
        }
    },
    
    },{
        freezeTableName: true
    }
);

export default Topics;