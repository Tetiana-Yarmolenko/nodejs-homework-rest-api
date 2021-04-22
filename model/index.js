const fs = require('fs/promises');
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  return fs.readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .catch((err) => err)
}

const getContactById = async (contactId) => {
const allContacts = await listContacts();
const getContact = allContacts.find(({ id }) => id == contactId);
return getContact;
} 

const removeContact = async (contactId) => {
   const allContacts = await listContacts();
  const delContact = allContacts.find(({ id }) => id == contactId);
  if (delContact) {
  const updateContacts = allContacts.filter((el) => el.id != contactId);
  await  fs.writeFile(contactsPath, JSON.stringify(updateContacts, 0, 2), 'utf-8');
  }
  // console.log(delContact);
  return delContact;
  
}

const addContact = async body => {
  const id =  uuidv4();
  const newContact = {
    id,
    ...body,
  };
  try {
    await listContacts().then(contacts => {
      contacts.push(newContact);
      const allContacts = JSON.stringify(contacts, 0, 2);
      fs.writeFile(contactsPath, allContacts, 'utf-8');
    });
     return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  // знаходимо контакт, який потрібно отовити
  const contact = allContacts.find(({ id }) => id == contactId);
  // записуємо оновлення контакту
  Object.assign(contact, body)
  console.log(contact);
  //  записуємо оновлення
  await fs.writeFile(contactsPath, JSON.stringify(allContacts),'utf-8')
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
