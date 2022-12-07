// import Tags from "../models/tagsModel.js";
// import TagsKebijakan from "../models/Tags_KebijakanModels.js";
// import Kebijakan from "../models/KebijakanModel.js";
import { Tags, TagsKebijakans, Kebijakans } from "../associations/Association.js";

export const createTags = async (req, res) => {
    const {nama_tags} = req.body;
    try {
        await Tags.create({
            nama_tags: nama_tags
        });
        res.status(201).json({msg: "Sukses membuat tags baru"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const createTagsKebijakan = async (req, res) => {
    const {tagsId, kebijakanId} = req.body;
    try {
        await TagsKebijakans.create({
            tagsId: tagsId,
            kebijakanId: kebijakanId
        });
        res.status(201).json({msg: "Sukses membuat tagskebijakan baru"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const getTags = async (req, res) => {
    try {
        let response;
        
        response = await Tags.findAll();
        
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getTagsKebijakan = async (req, res) => {
    try {
        let response;
        
        response = await Tags.findAll({
            include:[{
                model: Kebijakans,
                through: "tags_kebijakan",
                as: "kebijakan",
                foreignKey: "kebijakanId",
                // attributes: ['judul_kebijakan','isi_kebijakan','sudah_publish','jumlah_kunjungan'],
            }]
            // include:[{
            //     model: Tags,
            //     as: "tags"
            // }],
            // include:[{
            //     model: Kebijakans,
            //     as: "kebijakan"
            // }],
        });
        
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getTagsById = async (req, res) => {
    try {
        const tagskebijakan = await Tags.findOne({
            where:{
                tid: req.params.id
            }
        });

        if (!tagskebijakan) {
            return res.status(404).json({msg: "tags diskusi tidak ditemukan"});
        }

        let response;
        response = await Tags.findAll({
            where: {
                tid: tagskebijakan.tid
            },
            include:[{
                model: Kebijakans,
                through: "tags_kebijakan",
                as: "kebijakan",
                foreignKey: "kebijakanId",
                // attributes: ['judul_kebijakan','isi_kebijakan','sudah_publish','jumlah_kunjungan'],
            }]
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const editTags = async (req, res) => {
    try {
        const tags = await Tags.findOne({
            where: {
                tid: req.params.id
            }
        });
        
        if (!tags) {
            return res.status(404).json({msg: `tags dengan id ${tags.tid} tidak ditemukan`});
        }

        const {nama_tags} = req.body;
        if (req.role === "rakyat") {
            await Tags.update(
                {
                    nama_tags: nama_tags
                },
                { 
                    where:{
                        tid: tags.tid
                    // [Op.and]: [{did: diskusi.did}, {userId: req.uid}]
                    }
                }
            );    
        } else {
            return res.status(404).json({msg: "Pemerintah tidak dapat mengupdate tags diskusi"})
        }

        res.status(200).json({msg: "Sukses mengedit tags "});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const editTagsKebijakan = async (req, res) => {
    try {
        const tagskebijakan = await TagsKebijakans.findOne({
            where: {
                id: req.params.id
            }
        });
        
        if (!tagskebijakan) {
            return res.status(404).json({msg: `tags dengan id ${tagskebijakan.tagsId} tidak ditemukan`});
        }

        const {tagsId, kebijakanId} = req.body;
        if (req.role === "rakyat") {
            await TagsKebijakans.update(
                {
                    tagsId: tagsId,
                    kebijakanId: kebijakanId
                },
                { 
                    where:{
                        id: tagskebijakan.id
                    // [Op.and]: [{did: diskusi.did}, {userId: req.uid}]
                    }
                }
            );    
        } else {
            return res.status(404).json({msg: "Pemerintah tidak dapat mengupdate tags diskusi"})
        }

        res.status(200).json({msg: "Sukses mengedit tagskebijakan "});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteTags = async (req, res) => {
    try {
        const tags = await Tags.findOne({
            where: {
                tid: req.params.id
            }
        });

        if (!tags) {
            return res.status(404).json({msg: `tags dengan nama ${tags.nama_tags} tidak ditemukan`});
        }

        if (req.role === "rakyat") {
            await Tags.destroy({ 
                where:{
                    tid: tags.tid
                    // [Op.and]: [{did: diskusi.did}, {userId: req.uid}]
                }
            });      
        } else {
            return res.status(404).json({msg: "Pemerintah tidak dapat menghapus tags diskusi"})
        }

        res.status(200).json({msg: "Sukses menghapus tags diskusi"});
    } catch (error) {
        res.status(500).json({msg: error.message}); 
    }
}

export const deleteTagsKebijakan = async (req, res) => {
    try {
        const tagskebijakan = await TagsKebijakans.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!tagskebijakan) {
            return res.status(404).json({msg: `tagskebijakan dengan id ${tagskebijakan.id} tidak ditemukan`});
        }

        if (req.role === "rakyat") {
            await TagsKebijakans.destroy({ 
                where:{
                    id: tagskebijakan.id
                    // [Op.and]: [{did: diskusi.did}, {userId: req.uid}]
                }
            });      
        } else {
            return res.status(404).json({msg: "Pemerintah tidak dapat menghapus tags diskusi"})
        }

        res.status(200).json({msg: "Sukses menghapus tags diskusi"});
    } catch (error) {
        res.status(500).json({msg: error.message}); 
    }
}