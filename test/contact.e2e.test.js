const request = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../app')
const { User, contacts, newContact } = require('../model/__mocks__/data')
// const { set } = require('../app')

require('dotenv').config()

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const issueToken = (payload, secret) => jwt.sign(payload, secret)
const token = issueToken({ id: User.id }, JWT_SECRET_KEY)
User.token = token

jest.mock('../model/contacts.js')
jest.mock('../model/users.js')


describe('Testing the route api/contacts', () => {
 let idNewContact = null
  
  describe('should handle GET request', () => {
        test('should return 200 status for GET: /contacts', async (done) => {
            const res = await request(app)
        .get('/api/contacts')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(200)
      expect(res.body).toBeDefined()
      expect(res.body.data.contacts).toBeInstanceOf(Object)
      done()
        })
    test('should return 200 status for GET: /contacts/:contactId', async (done) => {
        const contact = contacts[0]
        const res = await request(app)
     .get(`/api/contacts/${contact._id}`)
     .set('Authorization', `Bearer ${token}`)
     .send()
      expect(res.status).toEqual(200)
      expect(res.body).toBeDefined()
      expect(res.body.data.contact._id).toBe(contact._id)
        done()
    })
    test('should return 404 status for GET: /contacts/:contactId', async (done) => {
      const res = await request(app)
        .get(`/api/contacts/7783fa09f0d5f477551219f1`)
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(404)
      expect(res.body).toBeDefined()
      done()
    })
    test('should return 400 status for GET: /contacts/:contactId', async (done) => {
      const res = await request(app)
        .get(`/api/contacts/6083f9f0d5f477551219f8`)
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toEqual(400)
      expect(res.body).toBeDefined()
      done()
    })
     })
    
    describe('should handle POST request', () => {
        test('should return 201 status for POST: /contacts', async (done) => {
          const res = await request(app)
            .post('/api/contacts')
            .set('Authorization', `Bearer ${token}`)
            .set('Accept', 'application/json')
            .send(newContact)
          expect(res.status).toEqual(201)
          expect(res.body).toBeDefined()
          idNewContact = res.body.data.contact._id
            done()
        })
      test('should return 400 status for POST: /contacts wrong field', async (done) => {
      const res = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({ ...newContact, test: 1 })
      expect(res.status).toEqual(400)
      expect(res.body).toBeDefined()
      done()
      })
       test('should return 400 status for POST: /contacts without field', async (done) => {
      const res = await request(app)
        .post('/api/contacts')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({phone : "(555) 555-6666"})
      expect(res.status).toEqual(400)
      expect(res.body).toBeDefined()
      done()
    })  
    })
    
    describe('should handle PUT request', () => {
    test('should return 200 status for PUT:  /contacts/:contactId', async (done) => {
      const res = await request(app)
        .put(`/api/contacts/${idNewContact}`)
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({ name: 'Link Devis' })
      expect(res.status).toEqual(200)
      expect(res.body).toBeDefined()
      expect(res.body.data.contact.name).toBe('Link Devis')
      done()
    })
    test('should return 400 status for PUT: /contacts/:id wrong field', async (done) => {
      const res = await request(app)
        .put('/api/contacts/1234')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({ test: 1 })
      expect(res.status).toEqual(400)
      expect(res.body).toBeDefined()
      done()
    })
    test('should return 404 status for PUT: /contacts/:id ', async (done) => {
      const res = await request(app)
        .put('/api/contacts/6083fa09f0d5f7551219f8')
        .set('Authorization', `Bearer ${token}`)
        .set('Accept', 'application/json')
        .send({ phone: "(250) 250-6600" })
      expect(res.status).toEqual(404)
      expect(res.body).toBeDefined()
      done()
    })
      
  })
    
})