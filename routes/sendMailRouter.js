const router = require('express').Router()
const mailerController = require('../controllers/mailerController')
router.get('/sendGmail', mailerController.sendGmail)
module.exports = router;
