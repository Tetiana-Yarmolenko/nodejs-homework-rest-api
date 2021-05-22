const express = require('express')
const { verify } = require('jsonwebtoken')
const router = express.Router()
const{signup, login, logout, current, updateAvatar, verifyUser, repeatEmailVerify} = require('../../controllers/users')
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

router.get('/verify/:verificationToke', verifyUser)
router.post('/verify', repeatEmailVerify)   


module.exports = router
