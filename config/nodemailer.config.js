const nodemailer= require("nodemailer");
const email = process.env.EMAIL || 'arquitecturadeservidores@gmail.com';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "Gmail",
    port: 465,
    secure:true,
    auth : {
        user: email,
        pass: process.env.EMAIL_PASS || "mzmmzmzzmzmmzmzzm1!",
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
    }
})



// He nombrado la aplicación en heroku como arq-serv-jimmy

module.exports.sendValidationEmail  = (user) =>{

    transporter.sendMail({
        from : `Arquitectura de Servidores <${email}>`,
        to: user.email,
        subject: "Welcome to Arq.Serv",
        html: `
        <h1> Welcome to Arq. de Serv. </h1>
        <a href= "https://arq-serv-jimmy.herokuapp.com/users/${user.id}/validate"> Activate your account </a>
        `
    })
    .then( () =>{
        console.log("email sent");
    })
    .catch((err)=> console.error("error sending email: ", err));
}
