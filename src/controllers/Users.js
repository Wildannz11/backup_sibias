// import Users from "../models/UserModel.js";
// import Kebijakan from "../models/KebijakanModel.js";
// import Diskusi from "../models/DiskusiModel.js";
import { Users, Kebijakans, Diskusis } from "../associations/Association.js";
import argon2 from "argon2";
import path from "path";
import fs from "fs";

export const getUser = async (req, res) => {
    try {
        const response = await Users.findAll(
            {
                attributes: ['uid','nama','username','email','password','role'],
                where: {
                    role: req.params.role 
                }
            }
        );
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getPemerintah = async (req, res) => {
    try {
        const role = req.params.role;
        const response = await Users.findAll(
            {
                attributes: ['uid','nama_lembaga','deskripsi_lembaga','email','password','role'],
                where: {
                    role: role 
                }
            }
        );
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getUserById = async (req, res) => {
    try {
        const response = await Users.findOne({
            attributes: ['uid','username','nama','email','password','alamat','no_hp','tgl_lahir','pendidikan','role','foto_data','foto_url'],
            where: {
                role: req.params.role,
                uid: req.params.id,
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getUserImageById = async (req, res) => {
    try {
        const response = await Users.findOne({
            attributes: ['foto_data','foto_url'],
            where: {
                uid: req.params.id,
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getPemerintahById = async (req, res) => {
    try {
        const response = await Users.findOne({
            attributes: ['uid','nama_lembaga','deskripsi_lembaga','email','password','role','foto_data','foto_url'],
            where: {
                role: req.params.role,
                uid: req.params.id,
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createUser = async (req, res) => {
    const {username, nama, email, password, confirm_password, role} = req.body;
    const uname = await Users.findOne({
        where: {
            username: username
        },
    });

    if (uname) {
        return res.status(400).json({msg: "username yang anda masukkan sudah dibuat sebelumnya, tolong ubah username anda "});
    }

    const uemail = await Users.findOne({
        where: {
            email: email
        },
    });

    if (uemail) {
        return res.status(400).json({msg: "email yang anda masukkan sudah dibuat sebelumnya, tolong ubah email anda "});
    }
    
    if (password !== confirm_password) {
        return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    }
    const hasPass = await argon2.hash(password);

    try {
        await Users.create({
            username: username,
            nama: nama,
            email: email,
            password: hasPass,
            role: role
        });
        res.status(201).json({msg: "Sukses mendaftarkan akun"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const createAkunPemerintah = async (req, res) => {
    const {email, password, confirm_password, nama_lembaga , deskripsi_lembaga, role} = req.body;

    const unamelembaga = await Users.findOne({
        where: {
            nama_lembaga: nama_lembaga
        },
    });

    if (unamelembaga) {
        return res.status(400).json({msg: "nama lembaga yang anda masukkan sudah dibuat sebelumnya, tolong ubah username anda "});
    }

    const uemail = await Users.findOne({
        where: {
            email: email
        },
    });

    if (uemail) {
        return res.status(400).json({msg: "email yang anda masukkan sudah dibuat sebelumnya, tolong ubah email anda "});
    }
    
    if (password !== confirm_password) {
        return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    }
    const hasPass = await argon2.hash(password);

    try {
        await Users.create({
            email: email,
            password: hasPass,
            nama_lembaga: nama_lembaga,
            deskripsi_lembaga: deskripsi_lembaga,
            role: role
        });
        res.status(201).json({msg: "Sukses mendaftarkan akun"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const editUser = async (req, res) => {
    const user = await Users.findOne({
        where: {
            uid: req.params.id
        }
    });

    if (!user) {
        return res.status(404).json({msg: "User tidak ditemukan"});
    }

    const {username, nama, email, password, confirm_password, alamat, no_hp, tgl_lahir, pendidikan} = req.body;
    let hasPass;
    if (password === "" || password === null || password === undefined) {
        hasPass = user.password;
    } else {
        hasPass = await argon2.hash(password);
    }

    if (password !== confirm_password) {
        return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    }

    try {
        await Users.update({
            username: username,
            nama: nama,
            email: email,
            password: hasPass,
            alamat: alamat,
            no_hp: no_hp,
            tgl_lahir: tgl_lahir,
            pendidikan: pendidikan
        },{
            where: {
                uid: user.uid
            }
        });
        res.status(200).json({msg: "Berhasil melakukan update"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const editPemerintah = async (req, res) => {
    const user = await Users.findOne({
        where: {
            uid: req.params.id
        }
    });

    if (!user) {
        return res.status(404).json({msg: "User tidak ditemukan"});
    }

    const {nama_lembaga, deskripsi_lembaga, email, password, confirm_password} = req.body;
    let hasPass;
    if (password === "" || password === null || password === undefined) {
        hasPass = user.password;
    } else {
        hasPass = await argon2.hash(password);
    }

    if (password !== confirm_password) {
        return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    }

    try {
        await Users.update({
            nama_lembaga: nama_lembaga,
            deskripsi_lembaga: deskripsi_lembaga,
            email: email,
            password: hasPass,
        },{
            where: {
                uid: user.uid
            }
        });
        res.status(200).json({msg: "Berhasil melakukan update pada akun ini"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteUser = async (req, res) => {
    const user = await Users.findOne({
        where: {
            uid: req.params.id
        }
    });

    if (!user) {
        return res.status(404).json({msg: "User tidak ditemukan"});
    }

    try {
        const fotodata  = user.foto_data === "" && user.foto_url === "";
        if (!fotodata){
            const filepath = `./public/images/users/${user.foto_data}`;
            fs.unlinkSync(filepath);
        }

        await Users.destroy({
            where:{
                uid: user.uid
            }
        });
        res.status(200).json({msg: "Berhasil menghapus akun ini"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const editUploadImageProfile = async (req, res) => {
    const users = await Users.findOne({
        where: {
            uid: req.params.id
        }
    });

    if (!users) {
        return res.status(404).json({msg: "Tidak ditemukan user, harap login terlebih dahulu"});
    }

    let fileName = "";
    if(req.files === null || req.files === undefined) {
        fileName = users.foto_data;
    } else {
        const file = req.files.foto;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png','.jpg','.jpeg'];

        if(!allowedType.includes(ext.toLowerCase())) {
            return res.status(422).json({msg: "Foto yang anda masukkan tidak valid"});
        }

        if(fileSize > 50000000) {
            return res.status(422).json({msg: "Ukuran foto harus kurang dari 50 MB"});
        }

        const fotodata  = users.foto_data === null && users.foto_url === null;
        if (!fotodata){
            const filepath = `./public/images/users/${users.foto_data}`;
            fs.unlinkSync(filepath);
        }
        
        file.mv(`./public/images/users/${fileName}`, (err)=>{
            if(err) {
                return res.status(500).json({msg: err.message})
            };
        });
    }
    
    const url = `${req.protocol}://${req.get("host")}/images/users/${fileName}`;
    
    try {
        await Users.update(
            {foto_data: fileName, foto_url: url },
            {where: { uid: req.params.id } }
        );
        res.status(200).json({msg: "Sukses mengupdate foto profile"});
    } catch (error) {
        console.log(error.message);
        res.status(400).json({msg: error.message});
    }

}
