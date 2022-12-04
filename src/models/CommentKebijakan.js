import { Sequelize } from "sequelize";
import db from "../config/db.js";

const {DataTypes} = Sequelize;
const CommentKebijakans = db.define('comment_kebijakan',{
    ckid:{ 
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    userId:{ 
        type: DataTypes.STRING, 
        allowNull: true,
        validate:{
            notEmpty: true,
        },
        onDelete: "CASCADE",
        references: {
            model: "user",
            key: "uid"
        }
    },
    kebijakanId:{ 
        type: DataTypes.STRING, 
        allowNull: true,
        validate:{
            notEmpty: true,
        },
        onDelete: "CASCADE",
        references: {
            model: "kebijakan",
            key: "kid"
        }
    },
    isi_comment:{ 
        type: DataTypes.TEXT, 
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
},{
    freezeTableName: true
})

export default CommentKebijakans;