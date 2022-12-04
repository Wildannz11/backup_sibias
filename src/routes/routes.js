import express from "express";

import {
    loginPemerintah, 
    login, 
    logout, 
    statusLoginPemerintah, 
    statusLoginUser
} from "../controllers/Auth.js";

import {
    createTags,
    createTagsKebijakan,
    getTags,
    getTagsById,
    editTags,
    editTagsKebijakan,
    deleteTags,
    deleteTagsKebijakan,
    getTagsKebijakan
} from "../controllers/Tags.js";

import {
    createTopic,
    createTopicDiskusi,
    getTopic,
    getTopicById,
    editTopic,
    editTopicDiskusi,
    deleteTopic,
    deleteTopicDiskusi,
    getTopicDiskusi
} from "../controllers/Topic.js";

import {
    createChatDiskusi,
    editChatDiskusi,
    deleteChatDiskusi
} from "../controllers/ChatDiskusi.js";

import {
    getDiskusi,
    getDiskusiById,
    createDiskusi,
    editDiskusi,
    deleteDiskusi
} from "../controllers/Diskusi.js";

import {
    getKebijakan,
    getKebijakanById,
    createKebijakan,
    editKebijakan,
    deleteKebijakan,
    uploadImageKebijakanBaru,
    editUploadImageKebijakan,
    publishKebijakan,
    deleteKebijakanWithoutImage
} from "../controllers/Kebijakan.js";

import {
    getCommentKebijakans,
    getCommentKebijakansById,
    createCommentKebijakans,
    editCommentKebijakans,
    deleteCommentKebijakans
} from "../controllers/CommentKebijakan.js";

import {
    getUser,
    getPemerintah, 
    getUserById,
    getPemerintahById, 
    createUser,
    createAkunPemerintah, 
    editUser,
    editPemerintah, 
    deleteUser,
    uploadImageProfileBaru,
    editUploadImageProfile,
    deleteUserWithoutImage,
    getUserImageById
} from "../controllers/Users.js"

import { verifyUser , rakyatOnly , pemerintahOnly } from "../middleware/AuthUser.js";

const router = express.Router();

const getHome = async (req, res) => {
    res.status(200).send('This is home menu of SIBIAS BE Apps');
    console.log("This is home menu of SIBIAS BE Apps");
}    

// Home
router.get('/', getHome)

// Authentication
router.get('/users/me', statusLoginUser);
router.get('/pemerintah/me', statusLoginPemerintah);

router.post('/users/login', login);
router.post('/pemerintah/login', loginPemerintah);

router.delete('/logout', logout);

// diskusi rakyat mengenai kebijakan
router.get('/diskusi', verifyUser, getDiskusi);
router.get('/diskusi/:id', verifyUser, getDiskusiById);
router.post('/diskusi', verifyUser, rakyatOnly, createDiskusi);
router.patch('/diskusi/:id', verifyUser, rakyatOnly, editDiskusi);
router.delete('/diskusi/:id', verifyUser, rakyatOnly, deleteDiskusi);

// CUD chat diskusi
router.post('/chatdiskusi/:did', verifyUser, rakyatOnly, createChatDiskusi);
router.patch('/chatdiskusi/:did/:id', verifyUser, rakyatOnly, editChatDiskusi);
router.delete('/chatdiskusi/:did/:id', verifyUser, rakyatOnly, deleteChatDiskusi);

// CRUD topic
router.post('/topic', verifyUser, createTopic);
router.post('/topicdiskusi', verifyUser, createTopicDiskusi);

router.get('/topic', verifyUser, getTopic);
router.get('/topicdiskusi', verifyUser, getTopicDiskusi);
router.get('/topic/:id', verifyUser, getTopicById);

router.patch('/topic/:id', verifyUser, editTopic);
router.patch('/topicdiskusi/:id', verifyUser, editTopicDiskusi);

router.delete('/topic/:id', verifyUser, deleteTopic);
router.delete('/topicdiskusi/:id', verifyUser, deleteTopicDiskusi);

// CRUD pemerintah kebijakan
router.get('/kebijakan', verifyUser, getKebijakan);
router.get('/kebijakan/:id', verifyUser, getKebijakanById);
router.post('/kebijakan', verifyUser, pemerintahOnly, createKebijakan);
router.patch('/kebijakan/:id', verifyUser, pemerintahOnly, editKebijakan);
router.delete('/kebijakanimg/:id', verifyUser, pemerintahOnly, deleteKebijakan);
router.delete('/kebijakan/:id', verifyUser, pemerintahOnly, deleteKebijakanWithoutImage);


router.patch('/images/kebijakannew/:id', verifyUser, pemerintahOnly, uploadImageKebijakanBaru);
router.patch('/images/kebijakan/:id', verifyUser, pemerintahOnly, editUploadImageKebijakan);
router.patch('/kebijakan/publish/:id', verifyUser, pemerintahOnly, publishKebijakan);


// CRUD comment kebijakan
router.get('/commentkebijakan', verifyUser, getCommentKebijakans);
router.get('/commentkebijakan/:id', verifyUser, getCommentKebijakansById);
router.post('/commentkebijakan/:kid', verifyUser, rakyatOnly, createCommentKebijakans);
router.patch('/commentkebijakan/:kid/:id', verifyUser, rakyatOnly, editCommentKebijakans);
router.delete('/commentkebijakan/:kid/:id', verifyUser, rakyatOnly, deleteCommentKebijakans);



// CRUD tags
router.post('/tags', verifyUser, createTags);
router.post('/tagskebijakan', verifyUser, createTagsKebijakan);

router.get('/tags', verifyUser, getTags);
router.get('/tagskebijakan', verifyUser, getTagsKebijakan);
router.get('/tags/:id', verifyUser, getTagsById);

router.patch('/tags/:id', verifyUser, editTags);
router.patch('/tagskebijakan/:id', verifyUser, editTagsKebijakan);

router.delete('/tags/:id', verifyUser, deleteTags);
router.delete('/tagskebijakan/:id', verifyUser, deleteTagsKebijakan);


// CRUD Users
router.get('/users/:role', verifyUser, rakyatOnly, getUser);
router.get('/pemerintah/:role', verifyUser, pemerintahOnly, getPemerintah);

router.get('/users/:role/:id', verifyUser, rakyatOnly, getUserById);
router.get('/pemerintah/:role/:id', verifyUser, pemerintahOnly, getPemerintahById);

router.post('/users', createUser);
router.post('/pemerintah', createAkunPemerintah);

router.patch('/users/:id',  verifyUser, rakyatOnly, editUser);
router.patch('/pemerintah/:id',  verifyUser, pemerintahOnly, editPemerintah);

router.delete('/usersimg/:id',  verifyUser, deleteUser);
router.delete('/users/:id',  verifyUser, deleteUserWithoutImage);

// patch user with image 
router.patch('/images/usersnew/:id', verifyUser, uploadImageProfileBaru);
router.patch('/images/users/:id', verifyUser, editUploadImageProfile);
router.get('/images/users/:id', verifyUser, getUserImageById);




export default router;