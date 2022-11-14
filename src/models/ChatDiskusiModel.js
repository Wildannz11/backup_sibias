// import { Sequelize } from "sequelize";
// import db from "../config/db.js";
// import Users from "./UserModel.js";
// import Diskusi from "./DiskusiModel.js";

// const {DataTypes} = Sequelize;

// const ChatDiskusi = db.define('chatdiskusi',{
//     cdid:{ 
//         type: DataTypes.STRING,
//         defaultValue: DataTypes.UUIDV4,
//         allowNull: false,
//         validate:{
//             notEmpty: true
//         }
//     },
//     id_user:{ 
//         type: DataTypes.STRING, 
//         allowNull: false,
//         validate:{
//             notEmpty: true,
//         }
//     },
//     id_diskusi:{ 
//         type: DataTypes.STRING, 
//         allowNull: false,
//         validate:{
//             notEmpty: true,
//         }
//     },
//     isi_chat:{ 
//         type: DataTypes.STRING, 
//         allowNull: false,
//         validate:{
//             notEmpty: true,
//         }
//     },
// },{
//     freezeTableName: true
// })


// Diskusi.hasMany(ChatDiskusi);
// ChatDiskusi.belongsTo(Users ,{foreignKey: ["id_user"]});
// ChatDiskusi.belongsTo(Diskusi ,{foreignKey: ["id_diskusi"]});

// export default ChatDiskusi;