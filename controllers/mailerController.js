const cron = require('node-cron')
const nodemailer = require('nodemailer')
require('dotenv/config')

const sendGmail = async (req, res) => {
    // const cronMail = cron.schedule('1 * * * *', function async () {
    // });
    // cronMail.start();
    let transaction, income, configMail, transporter, emailTarget, mail;
    console.log(process.env.PASS_MAIL)
    transaction = Math.floor(Math.random() * 10) + 1;

    income = `Rp ${transaction * 10000},00`;

    configMail = {
        service: 'gmail',
        auth: {
            user: 'ridwanrmdhn765@gmail.com',
            pass: process.env.PASS_MAIL
        }
    };
    console.log('config Mail', configMail)

    transporter = nodemailer.createTransport(configMail);
    emailTarget = 'mykhailomudryk1920@gmail.com';

    mail = {
        to: emailTarget,
        from: configMail.auth.user,
        subject: '[Daily Report] - Transaction & Total Income',
        html: `This is your Daily report. Total <b>success Transaction : ${transaction} </b>   and Total <b>Income : ${income} </b>`
    };
    transporter.sendMail(mail);
    res.status(200).json({
        msg: 'ok'
    })

}

module.exports = {
    sendGmail
}