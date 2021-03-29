const path = require('path')
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')

const transporter = nodemailer.createTransport({ 
    service: 'gmail',
    auth: {
    user: 'jbpradogomes@gmail.com',
    pass: 'devs3519'}
});

const mailOptions = { 
    from: 'jbpradogomes@gmail.com',
    to: 'brunogomesdeveloper@gmail.com',
    subject: 'Projeto de software',
    text: 'Teste de envio de email!'
  }

transporter.use('compile', hbs({
    viewEngine: 'handlebars',
    viewPath: path.resolve()
}))  

const recuperarsenha = (req, res, next) => {
    transporter.sendMail(mailOptions, (err, info) => { 
        if (err) {
            return console.log(err)
        }
        console.log(info)
        })
}

module.exports = {recuperarsenha}