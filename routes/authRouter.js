const router = require('express').Router()
const bcrypt = require('bcryptjs')
const authController = require('../controllers/authController')
const verifyRegister = require('../middlewares/verifyRegister')
router.post('/register', [verifyRegister.checkDuplicateEmail] ,authController.register)

router.post('/login', authController.login)

module.exports = router