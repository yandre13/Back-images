const {Router} = require('express'),
 router = Router(),
 {getImages, getImagesHome, getImagesHomeById, getImagesSearch, postImage, deleteImage} = require('./image'),
 {getUsers, postUser} = require('./user'),
 {postLogin} = require('./login'),
 {verifyToken} = require('../middlewares/verify')
 router
 .post('/login', postLogin)
 .get('/images/:id', verifyToken, getImages)
 .get('/images/home/:id', verifyToken, getImagesHomeById)
 .get('/images/search/:entry', getImagesSearch)
 .post('/images', postImage)
 .post('/users', postUser)
 .delete('/images/delete/:id', verifyToken, deleteImage)

 module.exports = router