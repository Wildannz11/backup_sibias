// import { Sequelize } from "sequelize";
// import db from "../config/db.js";
// import Users from "./UserModel.js";

// const {DataTypes} = Sequelize;
// const Kebijakan = db.define('kebijakan',{
//     kid:{ 
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
//     judul_diskusi:{ 
//         type: DataTypes.STRING, 
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
// },{
//     freezeTableName: true
// })

// Users.hasMany(Kebijakan);
// Kebijakan.belongsTo(Users, ({foreignKey: "id_user"}));


// export default Kebijakan;