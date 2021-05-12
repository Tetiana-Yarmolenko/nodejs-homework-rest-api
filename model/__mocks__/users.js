const { User, users } = require('./data')
const bcrypt = require('bcryptjs')
const SALT_WORK_FACTOR = 10

const findById = jest.fn((id) => {
   const [user] = users.filter((el) => String(el._id) === String(id))
  return user
})

const findByEmail = jest.fn((email) => {
    const [user] = users.filter((el) => String(el.email) === String(email))
   return user
})

const create = jest.fn(({ email, password }) => {
    pass = bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_WORK_FACTOR), null)
  const newUser = {
      email,
      password: pass,
      subscription,
    _id: '6097c0b153d55f41a08d3aa3',
     validPassword: function (pass) {
        return bcrypt.compareSync(pass, this.password)
      },
  }
  users.push(newUser)
    return newUser
})

const updateToken = jest.fn((id, token) => {
  return {}
})


const getCurrentUser = jest.fn((id, token) => {
  return {}
})

const updateAvatar = jest.fn((id, avatar, idCloudAvatar = null ) => {
  const [user] = users.filter((el) => String(el._id) === String(id))
  user.avatar = avatar
  user.idCloudAvatar =idCloudAvatar
  return user
})


module.exports = {
  findById,
  findByEmail,
  create,
  updateToken,
  getCurrentUser,
  updateAvatar
}