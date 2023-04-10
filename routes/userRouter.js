const router = require('express').Router()
const JWT = require('jsonwebtoken')
const authJWT = require('../middlewares/authJWT')
const userController = require('../controllers/userController')

router.get('/users', [authJWT.verifyToken, authJWT.isAdmin], userController.getAllUsers)

router.get('/users/:id', [authJWT.verifyToken], userController.getUser) //get 1 user

router.delete('/users', [authJWT.verifyToken, authJWT.isAdmin], userController.deleteUser)

router.patch('/users/:id', [authJWT.verifyToken], userController.updateUser)

module.exports = router