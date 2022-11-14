import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const getUser = async (req, res) => {
    try {
        const response = await Users.findAll({
            attributes: ['uid','nama','username','email','password','role']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getUserById = async (req, res) => {
    try {
        const response = await Users.findOne({
            attributes: ['uid','username','nama','email','password','role'],
            where: {
                uid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createUser = async (req, res) => {
    const {username, nama, email, password, confirm_password, role} = req.body;
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
        res.status(201).json({msg: "Succes mendaftarkan akun"});
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

    const {username, nama, email, password, confirm_password, role} = req.body;
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
        },{
            where: {
                id: user.id
            }
        });
        res.status(200).json({msg: "Berhasil melakukan update"});
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
        await Users.destroy({
            where:{
                id: user.id
            }
        });
        res.status(200).json({msg: "Berhasil menghapus user"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

// export default { getUser, getUserById, createUser, editUser, deleteUser };