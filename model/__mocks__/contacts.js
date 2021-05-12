const { contacts } = require('./data')

const listContacts = jest.fn((userId, query) => {
    const { limit = 20, offset = 0} = query
    return { contacts, total: contacts.length, limit, offset}
})

const getContactById = jest.fn((userId, contactId) => {
  const [result] = contacts.filter((el) => String(el._id) == String(contactId))
  return result
} )

const removeContact = jest.fn((userId, contactId) => {
 const index = contacts.findIndex((el) => String(el._id))
    if (index === -1) {
    return null
    }
    const [result] = contacts.splice(index, 1)
    return result
})

const addContact = jest.fn((userId, body) => {
  contacts.push({...body, _id: '6083fa09f0d5f477551219f8'})
    return { ...body, _id: '6083fa09f0d5f477551219f8'}
})

const updateContact = jest.fn( (userId, contactId, body) => {
 let [contact] = contacts.filter((el) => String(el._id) === String(contactId))
    if (contact) {
    contact = {...contact, ...body}
    }
    return contact
})


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
