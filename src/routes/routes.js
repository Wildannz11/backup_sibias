import express from "express";
import {login, logout, me} from "../controllers/Auth.js";
// import {
//     getDiskusi,
//     getDiskusiById,
//     createDiskusi,
//     editDiskusi,
//     deleteDiskusi
// } from "../controllers/Diskusi.js";
import {
    getUser, 
    getUserById, 
    createUser, 
    editUser, 
    deleteUser
} from "../controllers/Users.js"
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

// Authentication
router.get('/me', me);
router.post('/login', login);
router.delete('/logout', logout);

// diskusi rakyat mengenai kebijakan
// router.get('/diskusi', getDiskusi);
// router.get('/diskusi/:id', getDiskusiById);
// router.post('/diskusi', createDiskusi);
// router.patch('/diskusi/:id', editDiskusi);
// router.delete('/diskusi/:id', deleteDiskusi);

// CRUD Users
router.get('/users',  getUser);
router.get('/users/:id',  getUserById);
router.post('/users',  createUser);
router.patch('/users/:id',  editUser);
router.delete('/users/:id',  deleteUser);

export default router;