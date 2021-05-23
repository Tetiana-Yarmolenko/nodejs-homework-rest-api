const jwt = require('jsonwebtoken')
const jimp = require('jimp')
const fs = require('fs/promises')
const path = require('path')
var cloudinary = require('cloudinary').v2
const { promisify } = require('util')
require('dotenv').config()
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const Users = require('../model/users')
const EmailService = require('../services/email')
const { HttpCode } = require('../helpers/constants')



cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY_CLOUD,
  api_secret: process.env.API_SECRET_CLOUD,
})

const uploadToCloud = promisify(cloudinary.uploader.upload)

const signup = async (req, res, next) => {
  const { email} = req.body
  const user = await Users.findByEmail(email)
  if (user) {
    return res.status(HttpCode.CONFLICT).json({
     status: "error",
      code: HttpCode.CONFLICT,
      message: "Email in use",
      })
  }
  try {
    const newUser = await Users.create(req.body)
    const { id,name, email, subscription, avatar, verifyTokenEmail } = newUser
    try {
      const emailService = new EmailService(process.env.NODE_ENV)
      await emailService.sendVerifyEmail(verifyTokenEmail, email, name)  
    } catch (error) {
      console.log(error)
    }
    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
        user: {
          id,
          email,
          subscription,
          avatar,
        }
    })
  } catch (e) {
    next(e)
  }
}

const login = async (req, res, next) => {
 const { email, password } = req.body
    const user = await Users.findByEmail(email)
    const isValidPassword = await user?.validPassword(password)
    if (!user || !isValidPassword  || !user.verify) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: 'error',
      code: HttpCode.UNAUTHORIZED,
      message: "Email or password is wrong",
    })
    }
    const payload = { id: user.id }
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '2h' })
 console.log(token)
  await Users.updateToken(user.id, token)
  return res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: { token },
  })
  
}

const logout = async (req, res, next) => {
  const id = req.user.id
  await Users.updateToken(id, null)
  return res.status(HttpCode.NO_CONTENT).json({})
}


const current = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const user = await Users.getCurrentUser(userId);
    console.log(user);
    if (user) {
      return res.json({
        status: "success",
        code: HttpCode.OK,
        user: {
          email: user.email,
          subscription: user.subscription
        }
      });
    } else {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        message: "Not authorized",
      });
    }
  } catch (error) {
    next(error);
  }
}
// const updateAvatar = async (req, res, next) => {
//   const { id } = req.user
//   const avatarUrl = await saveAvatarUser(req)
//  
//   await Users.updateAvatar(id, avatarUrl)
//   return res.status(HttpCode.OK)
//     .json({
//       status: "success",
//       code: HttpCode.OK,
//       data: {avatarUrl}
//     })
// }

// оновлення аватару через використання cloudinary:

const updateAvatar = async (req, res, next) => {
  const { id } = req.user
  const {idCloudAvatar, avatarUrl}= await saveAvatarUserToCloud(req)
  await Users.updateAvatar(id, avatarUrl, idCloudAvatar)
  return res.status(HttpCode.OK)
    .json({
      status: "success",
      code: HttpCode.OK,
      data: {avatarUrl}
    })
}

const saveAvatarUser = async (req) => {
const FOLDER_AVATARS = process.env.FOLDER_AVATARS
  // req.file
  const pathFile = req.file.path
  const newNameAvatar = `${Date.now().toString()}-${req.file.originalname}`
  const img = await jimp.read(pathFile)
  await img
    .autocrop()
    .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE)
    .write(pathFile)
  try {
    await fs.rename(
      pathFile,
      path.join(process.cwd(), 'public', FOLDER_AVATARS, newNameAvatar),
    )
  } catch (e) {
    console.log(e.message)
  }
   const oldAvatar = req.user.avatar
  if (oldAvatar.includes(`${FOLDER_AVATARS}/`)) {
    await fs.unlink(path.join(process.cwd(), 'public', oldAvatar))
  }

  return path.join(FOLDER_AVATARS, newNameAvatar).replace('\\', '/')
}

// збереження аватару через використання cloudinary:
const saveAvatarUserToCloud = async (req) => {
  const pathFile = req.file.path
  const {
    public_id: idCloudAvatar,
    secure_url: avatarUrl,
  } = await uploadToCloud(pathFile, {
    public_id: req.user.idCloudAvatar?.replace('Avatars/', ''),
    folder: 'Avatars',
    transformation: { width: 250, height: 250, crop: 'pad' },
  })
  await fs.unlink(pathFile)
  return { idCloudAvatar, avatarUrl}
}

const verifyUser = async (req, res, next) => {
  try {
    const user = await Users.findByVerifyTokenEmail(req.params.token)
    if (user) {
      await Users.updateVerifyToken(user.id, true, null)
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        message:'Verification successful',
      })
    }
    return res.status(HttpCode.BAD_REQUEST).json({
        status: 'error',
        code: HttpCode.BAD_REQUEST,
        message:'User not found',
    })
    
  } catch (error) {
    next(error)
  }
}

const repeatEmailVerify = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email)
    if (user) {
      const { email, verifyTokenEmail } = user
       const emailService = new EmailService(process.env.NODE_ENV)
      await emailService.sendVerifyEmail(verifyTokenEmail, email)
    }
      if (!req.body.email) {
      return res.status(HttpCode.BAD_REQUEST).json({
       status: 'error',
      code: HttpCode.BAD_REQUEST,
       message: "missing required field email"
      })
    }
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
       message: "Verification has already been passed"
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { 
  signup,
  login,
  logout,
  current,
  updateAvatar,
  verifyUser,
  repeatEmailVerify
}