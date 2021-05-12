const contacts = [
  {_id : "6083f91cf0d5f477551219ec", 
    name : "Allen Raymond", 
    email: "nulla.ante@vestibul.co.uk", 
    phone : '(992) 914-3792', 
    favorite : true, 
  },
  {
     _id : "6083fa09f0d5f477551219f8", 
    name : "Chaim Lewis", 
    email : "dui.in@egetlacus.ca", 
    phone : "(294) 840-6685", 
    favorite : true
  },
]

const newContact = {
    name : "Jon Tonik", 
    email : "jon.ton@ukr.com", 
    phone : "(294) 840-6688", 
}

const User = {
    email: "Raisa@retac.com",
    password: "$2a$06$gQBOm1zb6tLKRQJ8r0878uOOuhL/3/6maFu3FS5HVYa90UNsth7Fa",
    _id: "6097c0b153d55f41a08d3aa3",
    id: "6097c0b153d55f41a08d3aa3",
    subscription: "starter",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOTdjMGIxNTNkNTVmNDFhMDhkM2FhMyIsImlhdCI6MTYyMDU1ODA3OSwiZXhwIjoxNjIwNTY1Mjc5fQ.Y8sphmpszgxtaTfwJCk1PQW8uH7tzb3LZ3nBQb3KtKc",
    createdAt: "2021-05-09T11:00:01.017+0000",
    updatedAt: "2021-05-09T11:01:19.317+000OiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOTdjMGIxNTNkNTVmNDFhMDhkM2FhMyIsImlhdCI6MTYyMDU1ODA3OSwiZXhwIjoxNjIwNTY1Mjc5fQ.Y8sphmpszgxtaTfwJCk1PQW8uH7tzb3LZ3nBQb3KtKc",
    avatar : "https://s.gravatar.com/avatar/06bb6e9db99513eb9136a7f1a9de250a?s=250", 
}
    
        

const users = []
users[0] = User

const newUser = { email: 'test@test.com', password: '123456' }

module.exports = { contacts, newContact, User, users, newUser }