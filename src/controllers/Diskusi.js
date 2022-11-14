// import Diskusi from "../models/DiskusiModel.js";
// import Users from "../models/UserModel.js";
// // import ChatDiskusi from "../models/ChatDiskusiModel.js";
// import { Op } from "sequelize";

// export const getDiskusi = async (req, res) => {
//     try {
//         let response;
//         if (req.role === 'rakyat') {
//             response = await Diskusi.findAll({
//                 attributes: ['did','judul_diskusi'],
//                 include:[{
//                     model: Users,
//                     attributes:['nama','username','email']
//                 }],
//                 // include:[{
//                 //     model: ChatDiskusi
//                 // }]
//             });
//         }
//         res.status(200).json(response);
//     } catch (error) {
//         res.status(500).json({msg: error.message});
//     }
// }

// export const getDiskusiById = async (req, res) => {
//     try {
//         const diskusi = await Diskusi.findOne({
//             where:{
//                 did: req.params.id
//             }
//         });

//         if (!diskusi) {
//             return res.status(404).json({msg: "Diskusi tidak ditemukan"});
//         }

//         let response;
//         if (req.role === 'rakyat') {
//             response = await Diskusi.findOne({
//                 attributes: ['did','judul_diskusi'],
//                 where: {
//                     id: diskusi.id
//                 },
//                 include:[{
//                     model: Users,
//                     attributes:['nama','username','email']
//                 }],
//                 // include:[{
//                 //     model: ChatDiskusi
//                 // }] 
//             })
//         } else {
//             return res.status(404).json({msg: "Pemerintah tidak dapat melihat isi diskusi"})            
//         }
        
//         res.status(200).json(response);
//     } catch (error) {
//         res.status(500).json({msg: error.message});
//     }
// }

// export const createDiskusi = async (req, res) => {
//     const {judul_diskusi} = req.body;
//     try {
//         await Diskusi.create({
//             judul_diskusi: judul_diskusi,
//             userId: req.userId
//         });
//         res.status(201).json({msg: "Sukses membuat diskusi baru"});
//     } catch (error) {
//         res.status(500).json({msg: error.message});
//     }
// }

// export const editDiskusi = async (req, res) => {
//     try {
//         const diskusi = await Diskusi.findOne({
//             where: {
//                 did: req.params.id
//             }
//         });
        
//         if (!diskusi) {
//             return res.status(404).json({msg: "Diskusi tidak ditemukan"});
//         }

//         const {judul_diskusi} = req.body;
//         if (req.role === "rakyat") {
//             if (req.userId === diskusi.userId) {
//                 await Diskusi.update(
//                     {
//                         judul_diskusi: judul_diskusi
//                     },
//                     { where:{
//                         // id: diskusi.id
//                         [Op.and]: [{id: diskusi.id}, {userId: req.userId}]
//                     }
//                 });
//             } else {
//                 return res.status(403).json({msg: "Harus login dengan email dan username yang sesuai"});
//             }       
//         }

//         res.status(200).json({msg: "Sukses mengedit judul diskusi"});
//     } catch (error) {
//         res.status(500).json({msg: error.message});
//     }
// }

// export const deleteDiskusi = async (req, res) => {
//     try {
//         const diskusi = await Diskusi.findOne({
//             where: {
//                 did: req.params.id
//             }
//         });

//         if (!diskusi) {
//             return res.status(404).json({msg: "Diskusi tidak ditemukan"});
//         }

//         if (req.role === "rakyat") {
//             if (req.userId === diskusi.userId) {
//                 await Diskusi.destroy({ 
//                     where:{
//                         // id: diskusi.id
//                         [Op.and]: [{id: diskusi.id}, {userId: req.userId}]
//                     }
//                 });
//             } else {
//                 return res.status(403).json({msg: "Harus login dengan email dan username yang sesuai"});
//             }       
//         }

//         res.status(200).json({msg: "Sukses mengedit judul diskusi"});
//     } catch (error) {
//         res.status(500).json({msg: error.message}); 
//     }
// }

// // export default {
// //     getDiskusi,
// //     getDiskusiById,
// //     createDiskusi,
// //     editDiskusi,
// //     deleteDiskusi
// // }