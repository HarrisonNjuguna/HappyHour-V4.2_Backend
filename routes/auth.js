const router = require('express').Router()
const authControler = require('../controllers/authController')

router.post('/register', authControler.createUser)

router.post('/login', authControler.loginUser)

module.exports = router;