const express = require('express')
const router = express.Router()

const { getAllContacts,
  getById,
  create,
  update,
  remove,
  updateStatus} = require('../../controllers/contacts')
const { validationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact,
validationQueryContact} = require('./valid-router-contacts');
const guard = require('../../helpers/guard')

router.get("/", guard, validationQueryContact, getAllContacts);
router.get("/:contactId", guard, getById )
router.post('/', guard, validationCreateContact, create)
router.delete('/:contactId', guard, remove)
router.put('/:contactId', guard, validationUpdateContact, update)
router.patch('/:contactId/favorite', guard, validationUpdateStatusContact, updateStatus)

module.exports = router
