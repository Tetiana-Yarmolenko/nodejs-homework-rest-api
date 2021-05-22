const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')
require('dotenv').config()



class EmailServise {
    #nodemailer = nodemailer
    #GenerateTemplate = Mailgen
    constructor (evn) {
        switch (evn) {
            case 'development':
            this.link = 'http://localhost:3000'
            break
            case 'production':
        this.link = 'link for production'
        break
        default:
        this.link = 'http://localhost:3000'
        break;
        }
    }
    #createTemplateVerifyEmail(verifyToken, name) {
        const mailGenerator = new this.#GenerateTemplate({
        theme: 'cerberus',
        product: {
        name: 'System contacts',
        link: this.link,
    },
})
    const email = {
    body: {
        name,
        email,
        intro: 'Welcome to System contacts! We\'re very excited to have you on board.',
        action: {
            instructions: 'To get started with System contacts, please click here:',
            button: {
                color: '#22BC66', // Optional action button color
                text: 'Confirm your account',
                link: `${this.link}/api/users/verify/${verifyToken}`
            }
        },
    },
    }
        
    const emailBody = mailGenerator.generate(email)
    return emailBody  
    }
    

    async sendVerifyEmail(verifyToken, email) {
    this.#nodemailer.createTransport(config)
    const msg = {
        to: 'TaniaYarmolenko@ex.ua', // Change to your recipient
        // створений сендер, потрібно створити, або замінити
      from: 'kylik.t.86.86@meta.ua', // Change to your verified sender
      subject: 'Verify email',
      html: this.#createTemplateVerifyEmail(verifyToken, email),
        }
        this.nodemailer.sendMail(msg)
}
}

module.exports = EmailServise