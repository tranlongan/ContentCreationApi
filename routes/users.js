const express = require('express');
const router = express.Router();
const controller = require('../controller/controller_user')
const {uploadByFields} = require("../controller/controller_user");

// GET
router.get('/', controller.contentDefault)
router.get('/dataForHeader', controller.dataForHeader)
router.get('/dataForProfile', controller.dataForProfile)
router.get('/dataForStore', controller.dataForStore)
router.get('/dataForDetailPost', controller.dataForDetailPost)
router.get('/dataForStoreManagement', controller.dataForStoreManagement)
router.get('/dataForStoreCategories', controller.dataForStoreCategories)
router.get('/dataForProducts', controller.dataForProducts)
router.get('/dataForNavStore', controller.dataForNavStore)
router.get('/dataForProduct', controller.dataForProduct)

// POST
router.post('/login', controller.login)
router.post('/register', controller.register)
router.post('/registerStore', controller.registerStore)
router.post('/uploadImg', controller.uploadImg)
router.post('/uploadArticle', controller.upload('image', 'public/upload/illustration'), controller.uploadArticle)
router.post('/updateAvatar', controller.upload('image', 'public/avatar'), controller.updateAvatar)
router.post('/updateBackground', controller.upload('image', 'public/background'), controller.updateBackground)
router.post('/updateCategoriesOfStore', controller.updateCategoriesOfStore)
router.post('/editCategoryOfStore', controller.updateCategoryOfStore)
router.post('/uploadProduct', uploadByFields([{name: 'image', maxCount: 1},{name: 'images', maxCount: 10}]), controller.uploadProduct)

module.exports = router;
