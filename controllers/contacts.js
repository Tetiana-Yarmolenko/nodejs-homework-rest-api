const Contact = require('../model/contacts')
const { HttpCode } = require('../helpers/constants')

const getAllContacts = async (req, res, next) => {
  try {
    const userId = req.user?.id
    const contacts = await Contact.listContacts(userId, req.query);
    return res.json({
      status: "success",
      code: HttpCode.OK,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};


const getById = async (req, res, next) => {
  try {
     const userId = req.user?.id
    const contact = await Contact.getContactById(userId, req.params.contactId);
    if (contact) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    }
    else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: 'Not Found',
      })
    }
  }
  catch (error) {
    next(error)
  }
}


const create = async (req, res, next) => {
   try {
    const userId = req.user?.id
     const contact = await Contact.addContact(userId, req.body);
     const { name, email, phone } = req.body;
    if (name && email && phone) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        },
      })
    }
    else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        message: "missing required name field",
      })
    }
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
  const userId = req.user?.id
   const contact = await Contact.removeContact(userId, req.params.contactId);
    if (contact) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        message: "contact deleted",
      })
    }
    else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        data: 'Not Found',
      })
    }
  }
  catch (error) {
    next(error)
  }
}


const update =  async (req, res, next) => {
  try {
     const userId = req.user?.id
    const contact = await Contact.updateContact(userId, req.params.contactId, req.body);
    if (contact) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        },
      })
    }
    else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
       message: "Not found",
      })
    }
  }
  catch (error) {
    next(error)
  }
}

const updateStatus = async (req, res, next) => {
  try {
     const userId = req.user?.id
    const contact = await Contact.updateContact(userId, req.params.contactId, req.body);
    if (contact) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        data: {
          contact,
        },
      })
    }
    else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: 'error',
        code: HttpCode.NOT_FOUND,
        data: 'Not Found',
      })
    }
  }
  catch (error) {
    next(error)
  }
}

module.exports = {
  getAllContacts,
  getById,
  create,
  update,
  remove,
  updateStatus,
}