const authRepository = require('../repository/auth'); 
const {buscarUsuarioCompleto} = require('../repository/usuarios');
const Usuario = require('../models/Usuario');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Status = require('http-status');

const login = (req, res, next) => {
    const { email, senha } = req.body;

    return authRepository.login(email, senha)
        .then(tokenValido => {
            if (!tokenValido) {
                return res
                    .status(401)
                    .end();
            }
            return res.json(tokenValido);
        })
        .catch(error => next(error));
};

const logout = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    return authRepository.logout(token)
        .then(() => res.status(200).end())
        .catch(err => next(err));
};

const forgot_password =  async (req, res, next) =>{

    const { email } = req.body;
    try{

        const user = await Usuario.findOne({email : email});

        if(!user)
            return res.status(400).send({error :'Usuário não encontrado!'});

        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);
        console.log(now.toLocaleString())
        

        await Usuario.updateOne({_id : user._id},{
            $set:{
                passwordResetToken: token,
                passwordResetExpires: now
            }
        });
        

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'jbpradogomes@gmail.com',
                pass: 'devs3519'
            }
            });

        const mailOptions = {
            from: 'jbpradogomes@gmail.com',
            to: email,
            subject: 'Recuperação de senha',
            text: 'http://localhost:4200/recuperarsenha/'+user._id+'/' +token
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              return res.status(400).send({erro:'Erro ao tentar enviar email!'});
            } else {
                res.status(200).end()   
              console.log('Email sent: ' + info.response);
            }
          }); 

    }catch(err){
        console.log(err)
        res.status(400).send({error :'Erro ao redefinir senha!'});
    }
}

// const reset_password = async (req, res , next) => {
//     const { email } = req.body;

//     const user = await Usuario.findOne({email : email});

//         if(!user)
//             return res.status(400).send({error :'Usuário não encontrado!'});

// }


const validarRecuperacaoSenha = async (req, res, next) => {


    const dados = req.body;    
    
    return buscarUsuarioCompleto(dados.id).then(usuario => { 
        if(!usuario){
            return res.status(Status.INTERNAL_SERVER_ERROR).end(); 
        }

        
        var now = new Date();

        now.setHours(now.getHours() - 1);

        if(now > usuario.passwordResetExpires){
            return res.status(Status.OK).json({ "mensagem" : "Data expirada.", "status": false});
        }
        if( dados.passwordResetToken != usuario.passwordResetToken){
            return res.status(Status.OK).json({ "mensagem" : "Token inválido.", "status": false});
        }
        return res.status(Status.OK).json({ "mensagem" : "Token e data válidos.", "status": true});
    }).catch(err => next(err))    
};
   
   


module.exports = { login, logout, forgot_password, validarRecuperacaoSenha };