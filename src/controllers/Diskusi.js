import { Diskusis, Users, ChatDiskusis, Topics } from "../associations/Association.js";
import { Op } from "sequelize";


export const getDiskusi = async (req, res) => {
    try {
        let response;
        
        response = await Diskusis.findAll({
            // attributes: ['did','judul_diskusi','jumlah_kunjungan'],
            include:[{
                model: ChatDiskusis,
                // as: 'chatdiskusi',
                // attributes:['isi_chat'],
                include:[{
                    model: Users,
                    // attributes:['uid','nama','username','email','foto_data','foto_url']
                }]
            },
            {
                model: Users,
                as: 'user',
                // attributes:['uid','nama','username','email','foto_data','foto_url'],
            },
            {
                model: Topics,
                through: "topic_diskusi",
                as: "topics",
                foreignKey: "topicId",
            }
        ],
            
            
        });
        
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getDiskusiById = async (req, res) => {
    try {
        const diskusi = await Diskusis.findOne({
            where:{
                did: req.params.id
            }
        });

        if (!diskusi) {
            return res.status(404).json({msg: "Judul Diskusi tidak ditemukan"});
        }

        let tambah = diskusi.jumlah_kunjungan + 1;
        await Diskusis.update(
            {
            jumlah_kunjungan: tambah
            },
            {
                where: {
                    did: diskusi.did
                }
        });

        let response;
        response = await Diskusis.findOne({
            attributes: ['did','judul_diskusi','jumlah_kunjungan'],
            where: {
                did: diskusi.did
            },
            // include:[{
            //     model: Users
            //     // attributes:['nama','username','email'],
            // }],
            include:[{
                model: ChatDiskusis,
                // as: 'chatdiskusi',
                attributes:['isi_chat'],
                include:[{
                    model: Users,
                    // attributes:['uid','nama','username','email','foto_data','foto_url']
                }]
            },
            {
                model: Users,
                as: 'user',
                // attributes:['uid','nama','username','email','foto_data','foto_url'],
            },
            {
                model: Topics,
                through: "topic_diskusi",
                as: "topics",
                foreignKey: "topicId",
            }]
        });

        req.did = diskusi.did;
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createDiskusi = async (req, res) => {
    const {judul_diskusi} = req.body;
    try {
        if (req.role === "rakyat"){
            await Diskusis.create({
                judul_diskusi: judul_diskusi,
                userId: req.uid
            });
        }
        res.status(201).json({msg: "Sukses membuat Diskusi baru"});
    } catch (error) {
        res.status(500).json({status: '500',msg: error.message});
    }
}

export const editDiskusi = async (req, res) => {
    try {
        const diskusi = await Diskusis.findOne({
            where: {
                did: req.params.id
            }
        });
        
        if (!diskusi) {
            return res.status(404).json({msg: "Diskusi tidak ditemukan"});
        }

        const {judul_Diskusi} = req.body;
        if (req.role === "rakyat") {
            if (req.uid === diskusi.userId) {
                await Diskusis.update(
                    {
                        judul_Diskusi: judul_Diskusi
                    },
                    { where:{
                        // id: Diskusis.id
                        [Op.and]: [{did: diskusi.did}, {userId: req.uid}]
                    }
                });
            } else {
                return res.status(403).json({msg: "Harus login dengan email dan username yang sesuai"});
            }       
        } else {
            return res.status(404).json({msg: "Pemerintah tidak dapat mengupdate judul Diskusi"})
        }

        res.status(200).json({status: "200", msg: "Sukses mengedit judul Diskusi"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteDiskusi = async (req, res) => {
    try {
        const diskusi = await Diskusis.findOne({
            where: {
                did: req.params.id
            }
        });

        if (!diskusi) {
            return res.status(404).json({msg: "Diskusi tidak ditemukan"});
        }

        if (req.role === "rakyat") {
            if (req.uid === diskusi.userId) {
                await Diskusis.destroy({ 
                    where:{
                        // id: Diskusis.id
                        [Op.and]: [{did: diskusi.did}, {userId: req.uid}]
                    }
                });
            } else {
                return res.status(403).json({msg: "Harus login dengan email dan username yang sesuai"});
            }       
        }

        res.status(200).json({msg: "Sukses menghapus judul Diskusi"});
    } catch (error) {
        res.status(500).json({msg: error.message}); 
    }
}