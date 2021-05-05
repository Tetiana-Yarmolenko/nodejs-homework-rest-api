const Contacts = require('./schemas/contact')

const listContacts = async (userId, query) => {
  const { favorite = null, limit = 20, offset = 0 } = query
  const optionSearch = { owner: userId }
  if (favorite !== null) {
    optionSearch.favorite = favorite
  }
  const results = await Contacts.paginate(optionSearch, {
    limit,
    offset,
    populate: {
      path: "owner",
      select: "email",
    },
  })
  return results
}

const getContactById = async (userId, contactId) => {
  const result = await Contacts.findOne({ _id: contactId, owner: userId }).populate({
    path: "owner",
    select: "email"
  })
  return result
} 

const removeContact = async (userId, contactId) => {
  const result = await Contacts.findByIdAndRemove({_id: contactId, owner: userId })
  return result
}

const addContact = async (userId, body) => {
  const result = await Contacts.create({...body, owner: userId})
  return result
};

const updateContact = async (userId, contactId, body) => {
 
  const result = await Contacts.findByIdAndUpdate(
    { _id: contactId, owner: userId },
    {...body},
    {new: true}
)
  console.log(result);
  return result
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
