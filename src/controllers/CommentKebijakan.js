import { CommentKebijakans, Users } from "../associations/Association.js";
import { Op } from "sequelize";

export const getCommentKebijakans = async (req, res) => {
    try {
        let response;
        
        response = await CommentKebijakans.findAll({
            where: {
                kebijakanId: req.params.id
            },
            attributes: ['ckid','isi_comment'],
            include:[{
                model: Users,
                attributes:['nama','username','email'],
            }],
            
        });
        
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getCommentKebijakansById = async (req, res) => {
    try {
        const commentkebijakan = await CommentKebijakans.findOne({
            where:{
                ckid: req.params.id
            }
        });

        if (!commentkebijakan) {
            return res.status(404).json({msg: "commentkebijakan tidak ditemukan"});
        }

        let response;
        response = await CommentKebijakans.findOne({
            attributes: ['ckid','isi_comment'],
            where: {
                ckid: commentkebijakan.ckid
            },
            include:[{
                model: Users,
                attributes:['nama','username','email']
            }],
        })

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createCommentKebijakans = async (req, res) => {
    const {isi_comment} = req.body;
    try {
        await CommentKebijakans.create({
            isi_comment: isi_comment,
            userId: req.uid,
            kebijakanId: req.params.kid,
        });
        res.status(201).json({msg: "Sukses membuat chat commentkebijakan baru"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const editCommentKebijakans = async (req, res) => {
    try {
        const commentKebijakans = await CommentKebijakans.findOne({
            where: {
                kebijakanId: req.params.kid,
                ckid: req.params.id,
            }
        });
        
        if (!commentKebijakans) {
            return res.status(404).json({msg: "Chat commentkebijakan yang anda cari tidak ditemukan"});
        }

        const {isi_comment} = req.body;
        // if (req.role === "rakyat") {
            if (req.uid === commentKebijakans.userId) {
                await CommentKebijakans.update(
                    {
                        isi_comment: isi_comment
                    },
                    { where:{
                        // id: commentkebijakan.id
                        [Op.and]: [{ckid: commentKebijakans.ckid}, {userId: req.uid}]
                    }
                });
            } else {
                return res.status(403).json({msg: "Harus login dengan email dan username yang sesuai"});
            }       
        // } else {
        //     return res.status(404).json({msg: "Pemerintah tidak dapat mengupdate judul commentkebijakan"})
        // }

        res.status(200).json({msg: "Sukses mengedit chat commentkebijakan"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteCommentKebijakans = async (req, res) => {
    try {
        const commentKebijakan = await CommentKebijakans.findOne({
            where: {
                kebijakanId: req.params.kid,
                ckid: req.params.id
            }
        });

        if (!commentKebijakan) {
            return res.status(404).json({msg: "Chat commentkebijakan tidak ditemukan"});
        }

        // if (req.role === "rakyat") {
            if (req.uid === commentKebijakan.userId) {
                await CommentKebijakans.destroy({ 
                    where:{
                        // id: commentkebijakan.id
                        [Op.and]: [{ckid: commentKebijakan.ckid}, {userId: req.uid}]
                    }
                });
            } else {
                return res.status(403).json({msg: "Harus login dengan email dan username yang sesuai"});
            }       
        // }

        res.status(200).json({msg: "Sukses menghapus chat commentkebijakan"});
    } catch (error) {
        res.status(500).json({msg: error.message}); 
    }
}