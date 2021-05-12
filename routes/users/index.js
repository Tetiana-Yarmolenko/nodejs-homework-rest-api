const express = require('express')
const router = express.Router()
const{signup, login, logout, current, updateAvatar} = require('../../controllers/users')
const guard = require('../../helpers/guard')
const uploadAvatar = require('../../helpers/tmp-avatar')
const {validationCreateUser, validationLoginUser} = require('./valid-router-user')


router.post('/signup',validationCreateUser, signup)
router.post('/login', validationLoginUser, login)
router.post('/logout', guard, logout)
router.get('/current', guard, current)
router.patch('/avatars',
    guard,
    uploadAvatar.single('avatar'),
    updateAvatar)


module.exports = router
