require('dotenv/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const corsOptions = require('./config/corsOptions')
const credentials = require('./middlewares/credentials')
const cookieParser = require('cookie-parser')
const errorHandler = require('./middlewares/errorHandler')
const { logger } = require('./middlewares/logEvents')
const mongoose = require('mongoose')
// const imageModel = require('./models/imageModel')
// const multer = require('multer')
const PORT = process.env.PORT || 3000
const ws = require('ws');
const cron = require('node-cron')
const nodemailer = require('nodemailer')

// app.use(logger)

app.use(credentials)

app.use(cors(corsOptions))

app.use(cookieParser())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use(errorHandler)

// app.get('/', (req, res) => {
//     res.json({
//         message: 'Welcome to store'
//     })
// })

app.use('/api/v1/auth', require('./routes/authRouter'))
app.use('/api/v1/', require('./routes/userRouter'))
app.use('/api/v1/', require('./routes/roleRouter'))
app.use('/api/v1/product', require('./routes/productRouter'))
app.use('/uploads', express.static('uploads'))
app.use('/api/gmail', require('./routes/sendMailRouter'))

var task = cron.schedule('1 * * * *', async() => {
    console.log('Running task every second');
    await sendEmail().then(console.log('sukses', sendEmail))
});
task.start()
// app.use('/api/products', require('./routes/products'))

// // send email
async function sendEmail() {
    let transaction, income, configMail, transporter, emailTarget, mail;

    transaction = Math.floor(Math.random() * 10) + 1;

    income = `Rp ${transaction * 10000},00`;

    configMail = {
        service: 'gmail',
        auth: {
            user: 'ridwanrmdhn765@gmail.com',
            pass: process.env.PASS_MAIL
        }
    };

    transporter = nodemailer.createTransport(configMail);
    emailTarget = 'mykhailomudryk1920@gmail.com';
    console.log('task', configMail)
    mail = {
        to: emailTarget,
        from: configMail.auth.user,
        subject: '[Daily Report] - Transaction & Total Income',
        html: `This is your Daily report. Total <b>success Transaction : ${transaction} </b>   and Total <b>Income : ${income} </b>`
    };
    transporter.sendMail(mail);
}

mongoose.connect(process.env.DB_CONNECTION).then(() => {
    app.listen(PORT, () => console.log(PORT))
    console.log('Connected to MongoDB')
}).catch(err => {
    console.log('Connection error', err)
    process.exit()
})