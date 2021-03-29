const nodemailer = require('nodemailer');
const {service , user, pass} = require('../config/email.json')
const path = require('path')
const hbs = require('nodemailer-express-handlebars');

const transporter = nodemailer.createTransport({ 
    service: service,
    auth: {
    user: user,
    pass: pass}
});

transporter.use('compile', hbs({
    viewEngine :  {
        extName: '.html',
        partialsDir: path.resolve('./src/resources/mail/'),
        layoutsDir: path.resolve('./src/resources/mail/'),
        defaultLayout: 'email.html',
    },
    viewPath: path.resolve('./src/resources/mail/'),
    extName:'.html',
}));

const mailOptions = { 
    from: 'jbpradogomes@gmail.com',
    to: 'brunogomesdeveloper@gmail.com',
    subject: 'Projeto de software',
    text: 'Teste de envio de email!'
  }

  module.exports = {transporter}



