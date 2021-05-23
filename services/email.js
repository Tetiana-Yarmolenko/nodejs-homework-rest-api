const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')
require('dotenv').config()

class EmailService {
  #sender = nodemailer
  #GenerateTemplate = Mailgen
  constructor(env) {
    switch (env) {
      case 'development':
        this.link = 'http://localhost:3000'
        break
      case 'production':
        this.link = 'http://localhost:3000'
        break
      default:
        this.link = 'http://localhost:3000'
        break
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
        intro:
          "Welcome to System cats! We're very excited to have you on board.",
        action: {
          instructions: 'To get started with System cats, please click here:',
          button: {
            color: '#22BC66', // Optional action button color
            text: 'Confirm your account',
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
      },
    }

    const emailBody = mailGenerator.generate(email)
    return emailBody
  }
  async sendVerifyEmail(verifyToken, email, name) {
    const config = {
      host: 'smtp.meta.ua',
      port: 465,
      secure: true,
      auth: {
        user: 'kylik.t.86.86@meta.ua',
        pass: process.env.PASSWORD,
      },
    }

    const transporter = this.#sender.createTransport(config)

    const emailOptions = {
      from: 'kylik.t.86.86@meta.ua',
      to: email,
      // to: "TaniaYarmolenko@ex.ua",
      subject: 'Verify email',
      html: this.#createTemplateVerifyEmail(verifyToken, name),
    }

    await transporter.sendMail(emailOptions)
  }
}

module.exports = EmailService
