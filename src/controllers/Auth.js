import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const login = async (req, res) => {
    const user = await Users.findOne({
        where: {
            email: req.body.email
        }
    });
    if(!user) {
        return res.status(404).json({msg: "User tidak ditemukan"});
    }
    
    const match = await argon2.verify(user.password, req.body.password);
    if(!match) {
        return res.status(400).json({msg: "password salah"});
    }    
    
    req.session.uid = user.uid;
    const uid = user.uid;
    const username = user.username;
    const email = user.email;
    const role = user.role;
    res.status(200).json({uid, username, email, role});
}

export const me = async (req, res) =>{
    if(!req.session.uid){
        return res.status(401).json({msg: "Mohon login ke akun Anda!"});
    }
    const user = await Users.findOne({
        attributes:['uid','username','email','role'],
        where: {
            uid: req.session.uid
        }
    });
    if(!user) {
        return res.status(404).json({msg: "User tidak ditemukan"});
    }
    
    res.status(200).json(user);
}

export const logout = (req, res) =>{
    req.session.destroy((err)=>{
        if(err) {
            return res.status(400).json({msg: "Tidak dapat logout"});
        }
        res.status(200).json({msg: "Anda telah logout"});
    });
}

// export default {login, me, logout};