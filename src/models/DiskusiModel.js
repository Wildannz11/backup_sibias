import { Sequelize } from "sequelize";
import db from "../config/db.js";
// import Users from "./UserModel.js";
// import ChatDiskusi from "./ChatDiskusiModel.js";

const {DataTypes} = Sequelize;

const Diskusis = db.define('diskusi',{
    // id:{
    //     type: DataTypes.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true
    // },
    did:{ 
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        validate:{
            notEmpty: true
        }
    },
    judul_diskusi:{ 
        type: DataTypes.STRING, 
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    jumlah_kunjungan:{ 
        type: DataTypes.BIGINT, 
        allowNull: true,
        validate:{
            notEmpty: true,
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
},{
    freezeTableName: true
});

// Users.hasMany(Diskusis, 
//     {
//         foreignKey: 'userId'
//     }
// );
// Diskusis.belongsTo(Users, 
//     {
//         foreignKey: 'userId'
//     }
// );

export default Diskusis;