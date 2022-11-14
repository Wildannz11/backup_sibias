import Users from "../models/UserModel.js";

export const verifyUser = async (req, res, next) =>{
    if(!req.session.id){
        return res.status(401).json({msg: "Mohon login ke akun Anda!"});
    }
    const user = await Users.findOne({
        where: {
            uid: req.session.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    req.id = user.id;
    req.role = user.role; 
    next();
}

export const pemerintahOnly = async (req, res, next) =>{
    const user = await Users.findOne({
        where: {
            uid: req.session.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    if(user.role !== "pemerintah") return res.status(403).json({msg: "Akses terlarang bagi rakyat"});
    next();
}

export const rakyatOnly = async (req, res, next) =>{
    const user = await Users.findOne({
        where: {
            uid: req.session.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    if(user.role !== "rakyat") return res.status(403).json({msg: "Akses terlarang bagi pemerintah"});
    next();
}

// export default {pemerintahOnly, rakyatOnly, verifyUser}