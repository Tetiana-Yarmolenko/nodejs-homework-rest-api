const express = require('express')
const router = express.Router()

const Contact = require('../../model/index.js')
const { validationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact } = require('./valid-router');


router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contact.listContacts();
    return res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});


router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await Contact.getContactById(req.params.contactId);
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      });
    }
    else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not Found',
      })
    }
  }
  catch (error) {
    next(error)
  }
})


router.post('/', validationCreateContact, async (req, res, next) => {
   try {
     const contact = await Contact.addContact(req.body);
     const { name, email, phone } = req.body;
    if (name && email && phone) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      })
    }
    else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: "missing required name field",
      })
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
   const contact = await Contact.removeContact(req.params.contactId);
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        message: "contact deleted",
      })
    }
    else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      })
    }
  }
  catch (error) {
    next(error)
  }
})


router.put('/:contactId', validationUpdateContact,  async (req, res, next) => {
  try {
    const contact = await Contact.updateContact(req.params.contactId, req.body);
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      })
    }
    else {
      return res.status(404).json({
        status: 'error',
        code: 404,
       message: "Not found",
      })
    }
  }
  catch (error) {
    next(error)
  }
})

router.patch('/:contactId/favorite', validationUpdateStatusContact, async (req, res, next) => {
  try {
    const contact = await Contact.updateContact(req.params.contactId, req.body);
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        data: {
          contact,
        },
      })
    }
    else {
      return res.status(404).json({
        status: 'error',
        code: 404,
        data: 'Not Found',
      })
    }
  }
  catch (error) {
    next(error)
  }
})

module.exports = router
