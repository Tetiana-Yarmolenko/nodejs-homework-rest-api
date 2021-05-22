const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')
require('dotenv').config()

class EmailServise {
    #sender = nodemailer
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
        theme: 'neopolitan',
        product: {
        name: 'System contacts',
        link: this.link,
    },
})

const emailFrom =  'goitnodejs@meta.ua'

        const email = {
    body: {
        name,
        emailFrom,
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

    async sendVerifyEmail(verifyToken, email, name) {
    // this.#sender.setApiKey(process.evn.SENDGRID_API_KEY)
    // const msg = {
    //     to: email, // Change to your recipient
    //     // створений сендер, потрібно створити, або замінити
    //   from: 'TaniaYarmolenko@ex.ua', // Change to your verified sender
    //   subject: 'Verify email',
    //   html: this.#createTemplateVerifyEmail(verifyToken, email),
    //     }
    //     this.#sender.send(msg)
        const config = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
    auth: {
    // user: 'kylik.t.86.86@meta.ua',
    // pass: process.env.PASSWORD_M,
    user: 'goitnodejs@meta.ua',
    pass: process.env.PASSWORD,
  },
}
        
const transporter = this.#sender.createTransport(config)
const emailOptions = {
  from: 'goitnodejs@meta.ua',
  to: email,
  subject: 'Verify email',
 html: this.#createTemplateVerifyEmail(verifyToken, email, name),
}

await transporter.sendMail(emailOptions)
  
}
}

module.exports = EmailServise