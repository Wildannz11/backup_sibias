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
    getChatDiskusi,
    getChatDiskusiById,
    createChatDiskusi,
    editChatDiskusi,
    deleteChatDiskusi
} from "../controllers/ChatDiskusi.js";

import {
    getDiskusi,
    getDiskusiById,
    createDiskusi,
    editDiskusi,
    deleteDiskusi,
    getSearchDiskusibyNama
} from "../controllers/Diskusi.js";

import {
    getKebijakan,
    getKebijakanById,
    createKebijakan,
    editKebijakan,
    deleteKebijakan,
    editUploadImageKebijakan,
    publishKebijakan,
    getSearchKebijakanByNama
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
    editUploadImageProfile,
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
// router.get('/diskusi', verifyUser, getDiskusi);
// router.get('/diskusii', verifyUser, getSearchDiskusibyNama);
// // router.get('/diskusi?judul_diskusi=', verifyUser, getSearchDiskusibyNama);
// router.get('/diskusi/:id', verifyUser, getDiskusiById);
// router.post('/diskusi', verifyUser, rakyatOnly, createDiskusi);
// router.patch('/diskusi/:id', verifyUser, rakyatOnly, editDiskusi);
// router.delete('/diskusi/:id', verifyUser, rakyatOnly, deleteDiskusi);

router.get('/diskusi', getDiskusi);
router.get('/diskusii', getSearchDiskusibyNama);
// router.get('/diskusi?judul_diskusi=', verifyUser, getSearchDiskusibyNama);
router.get('/diskusi/:id', getDiskusiById);
router.post('/diskusi', rakyatOnly, createDiskusi);
router.patch('/diskusi/:id', rakyatOnly, editDiskusi);
router.delete('/diskusi/:id', rakyatOnly, deleteDiskusi);

// CUD chat diskusi
// router.get('/chatdiskusi/:did', verifyUser, getChatDiskusi);
// router.get('/chatdiskusii/:id', verifyUser, getChatDiskusiById);
// router.post('/chatdiskusi/:did', verifyUser, rakyatOnly, createChatDiskusi);
// router.patch('/chatdiskusi/:did/:id', verifyUser, rakyatOnly, editChatDiskusi);
// router.delete('/chatdiskusi/:did/:id', verifyUser, rakyatOnly, deleteChatDiskusi);

router.get('/chatdiskusi/:did', getChatDiskusi);
router.get('/chatdiskusii/:id',  getChatDiskusiById);
router.post('/chatdiskusi/:did', rakyatOnly, createChatDiskusi);
router.patch('/chatdiskusi/:did/:id', rakyatOnly, editChatDiskusi);
router.delete('/chatdiskusi/:did/:id', rakyatOnly, deleteChatDiskusi);

// CRUD topic
// router.post('/topic', verifyUser, createTopic);
// router.post('/topicdiskusi', verifyUser, createTopicDiskusi);

// router.get('/topic', verifyUser, getTopic);
// router.get('/topicdiskusi', verifyUser, getTopicDiskusi);
// router.get('/topic/:id', verifyUser, getTopicById);

// router.patch('/topic/:id', verifyUser, editTopic);
// router.patch('/topicdiskusi/:id', verifyUser, editTopicDiskusi);

// router.delete('/topic/:id', verifyUser, deleteTopic);
// router.delete('/topicdiskusi/:id', verifyUser, deleteTopicDiskusi);

router.post('/topic',  createTopic);
router.post('/topicdiskusi', createTopicDiskusi);

router.get('/topic',  getTopic);
router.get('/topicdiskusi', getTopicDiskusi);
router.get('/topic/:id', getTopicById);

router.patch('/topic/:id', editTopic);
router.patch('/topicdiskusi/:id', editTopicDiskusi);

router.delete('/topic/:id', deleteTopic);
router.delete('/topicdiskusi/:id', deleteTopicDiskusi);

// CRUD pemerintah kebijakan
router.get('/kebijakan', getKebijakan);
// router.get('/kebijakan?judul_kebijakan=', getSearchKebijakanByNama);
router.get('/kebijakann', getSearchKebijakanByNama);
router.get('/kebijakan/:id', getKebijakanById);
router.post('/kebijakan', pemerintahOnly, createKebijakan);
router.patch('/kebijakan/:id', pemerintahOnly, editKebijakan);
router.delete('/kebijakan/:id', pemerintahOnly, deleteKebijakan);

router.patch('/images/kebijakan/:id', pemerintahOnly, editUploadImageKebijakan);
router.patch('/kebijakan/publish/:id', pemerintahOnly, publishKebijakan);


// CRUD comment kebijakan
router.get('/commentkebijakan', getCommentKebijakans);
router.get('/commentkebijakan/:id', getCommentKebijakansById);
router.post('/commentkebijakan/:kid', createCommentKebijakans);
router.patch('/commentkebijakan/:kid/:id', editCommentKebijakans);
router.delete('/commentkebijakan/:kid/:id', deleteCommentKebijakans);



// CRUD tags
router.post('/tags', createTags);
router.post('/tagskebijakan', createTagsKebijakan);

router.get('/tags', getTags);
router.get('/tagskebijakan', getTagsKebijakan);
router.get('/tags/:id', getTagsById);

router.patch('/tags/:id', editTags);
router.patch('/tagskebijakan/:id', editTagsKebijakan);

router.delete('/tags/:id', deleteTags);
router.delete('/tagskebijakan/:id', deleteTagsKebijakan);


// CRUD Users
router.get('/users/:role', rakyatOnly, getUser);
router.get('/pemerintah/:role', pemerintahOnly, getPemerintah);

router.get('/users/:role/:id', rakyatOnly, getUserById);
router.get('/pemerintah/:role/:id', pemerintahOnly, getPemerintahById);

router.post('/users', createUser);
router.post('/pemerintah', createAkunPemerintah);

router.patch('/users/:id', rakyatOnly, editUser);
router.patch('/pemerintah/:id', pemerintahOnly, editPemerintah);


router.delete('/users/:id', deleteUser);

// patch user with image 
router.patch('/images/users/:id', editUploadImageProfile);
router.get('/images/users/:id', getUserImageById);




export default router;