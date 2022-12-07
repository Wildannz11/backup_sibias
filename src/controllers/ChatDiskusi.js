// import ChatDiskusis from "../models/ChatDiskusiModel.js";
import { ChatDiskusis, Diskusis, Users } from "../associations/Association.js";
import { Op } from "sequelize";

export const getChatDiskusi = async (req, res) => {
    try {
        let response;
        
        response = await ChatDiskusis.findAll({
            where: {
                diskusiId: req.params.did
            },
            // attributes: ['cdid','isi_chat','jumlah_kunjungan'],
            include:[
                {
                    model: Users
                // attributes:['nama','username','email'],
                },
                {
                    model: Diskusis
                }

            ],
            
        });
        
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getChatDiskusiById = async (req, res) => {
    try {
        const diskusi = await ChatDiskusis.findOne({
            where:{
                cdid: req.params.id
            }
        });

        if (!diskusi) {
            return res.status(404).json({msg: "Judul diskusi tidak ditemukan"});
        }

        let response;
        response = await ChatDiskusis.findOne({
            where: {
                cdid: diskusi.cdid
            },
            include:[
                {
                    model: Users,
                },
                {
                    model: Diskusis
                }
            ],
        })

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createChatDiskusi = async (req, res) => {
    const {isi_chat} = req.body;
    try {
        await ChatDiskusis.create({
            isi_chat: isi_chat,
            userId: req.uid,
            diskusiId: req.params.did,
        });
        res.status(201).json({msg: "Sukses membuat chat diskusi baru"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const editChatDiskusi = async (req, res) => {
    try {
        const chatdiskusi = await ChatDiskusis.findOne({
            where: {
                diskusiId: req.params.did,
                cdid: req.params.id,
            }
        });
        
        if (!chatdiskusi) {
            return res.status(404).json({msg: "Chat Diskusi yang anda cari tidak ditemukan"});
        }

        const {isi_chat} = req.body;
        if (req.role === "rakyat") {
            if (req.uid === chatdiskusi.userId) {
                await ChatDiskusis.update(
                    {
                        isi_chat: isi_chat
                    },
                    { where:{
                        // id: diskusi.id
                        [Op.and]: [{cdid: chatdiskusi.cdid}, {userId: req.uid}]
                    }
                });
            } else {
                return res.status(403).json({msg: "Harus login dengan email dan username yang sesuai"});
            }       
        } else {
            return res.status(404).json({msg: "Pemerintah tidak dapat mengupdate judul diskusi"})
        }

        res.status(200).json({msg: "Sukses mengedit chat diskusi"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteChatDiskusi = async (req, res) => {
    try {
        const chatdiskusi = await ChatDiskusis.findOne({
            where: {
                diskusiId: req.params.did,
                cdid: req.params.id
            }
        });

        if (!chatdiskusi) {
            return res.status(404).json({msg: "Chat Diskusi tidak ditemukan"});
        }

        if (req.role === "rakyat") {
            if (req.uid === chatdiskusi.userId) {
                await ChatDiskusis.destroy({ 
                    where:{
                        // id: diskusi.id
                        [Op.and]: [{cdid: chatdiskusi.did}, {userId: req.uid}, {diskusiId: req.did}]
                    }
                });
            } else {
                return res.status(403).json({msg: "Harus login dengan email dan username yang sesuai"});
            }       
        }

        res.status(200).json({msg: "Sukses menghapus chat diskusi"});
    } catch (error) {
        res.status(500).json({msg: error.message}); 
    }
}