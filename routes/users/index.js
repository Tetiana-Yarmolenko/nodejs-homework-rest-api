const express = require('express')
const router = express.Router()
const{signup, login, logout, current} = require('../../controllers/users')
const guard = require('../../helpers/guard')
const {validationCreateUser, validationLoginUser} = require('./valid-router-user')


router.post('/signup',validationCreateUser, signup)
router.post('/login', validationLoginUser, login)
router.post('/logout', guard, logout)
router.get('/current',guard, current)

module.exports = router
