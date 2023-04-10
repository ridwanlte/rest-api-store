const router = require('express').Router()
const authJWT = require('../middlewares/authJWT')
const roleController = require('../controllers/roleController')

router.get('/roles', [authJWT.verifyToken, authJWT.isAdmin], roleController.getAllRoles)

module.exports = router