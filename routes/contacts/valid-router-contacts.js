const Joi = require('joi');
const mongoose = require('mongoose')

const schemaCreateContact = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.string().min(1).max(15).required(),
})
    
const schemaQueryContact = Joi.object({
    limit: Joi.number().integer().min(1).max(20).optional(),
    offset: Joi.number().integer().min(0).optional(),
    favorite: Joi.boolean().optional(),
    // filter: Joi.boolean().valid("favorite").optional(),
})


const schemaUpdateContact = Joi.object({
    name: Joi.string().min(3).max(30).optional(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).optional(),
    phone: Joi.string().min(1).max(15).optional(),
}).or('name', 'email', 'phone')

const schemaUpdateStatusContact = Joi.object({
    favorite: Joi.boolean().required()
})

const validate = async (schema, obj, next) => {
    try {
        await schema.validateAsync(obj);
        return next()
}
    catch (err) {
        console.log(err);
        next({
            status: 400,
            message: err.message
        })
    }
}

module.exports = {
     validationQueryContact: async (req, res, next) => {
        return await validate(schemaQueryContact, req.query, next)
    },
    validationCreateContact: async (req, res, next) => {
        return await validate(schemaCreateContact, req.body, next)
    },
     validationUpdateContact: async (req, res, next) => {
        return await validate(schemaUpdateContact, req.body, next)
    },
    validationUpdateStatusContact: async (req, res, next) => {
        return await validate(schemaUpdateStatusContact, req.body, next)
    }
    
}