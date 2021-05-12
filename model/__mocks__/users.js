const { User, users } = require('./data')
const bcrypt = require('bcryptjs')

const findById = jest.fn((id) => {
   const [user] = users.filter((el) => String(el._id) === String(id))
  return user
})

const findByEmail = jest.fn((email) => {
    const [user] = user.filter((el) => String(el.email) === String(email))
   return user
})

const create = jest.fn(({ email, password }) => {
    // const newUser = {
    //   email,
    //   password: pass,
    //     subscription,
    //   _id: ''
    // }
    return {}
})

// const create = async (userOptions) => {
//   const user = new User(userOptions)
//   return await user.save()
// }

const updateToken = jest.fn((id, token) => {
  return {}
})


const getCurrentUser = jest.fn((id, token) => {
  return {}
})

const updateAvatar = jest.fn((id, token) => {
  return {}
})



module.exports = {
  findById,
  findByEmail,
  create,
  updateToken,
  getCurrentUser,
  updateAvatar
}