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

// app.use(logger)

app.use(credentials)

app.use(cors(corsOptions))

app.use(cookieParser())

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use(errorHandler)

// const Storage = multer.diskStorage({
//     destination: 'uploads',
//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     }
// })

// const upload = multer({
//     storage: Storage
// }).single('testImage')

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// })
// // console.log('rwrwr', s)
// console.log('str', storage)

// var upload = multer({ storage: storage })
// console.log('wrwr', upload)
// app.post("/uploadphoto", upload.single('myImage'), (req, res) => {
//     var img = fs.readFileSync(req.file.path);
//     var encode_img = img.toString('base64');
//     var final_img = {
//         contentType: req.file.mimetype,
//         image: new Buffer(encode_img, 'base64')
//     };
//     imageModel.create(final_img, function (err, result) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(result.img.Buffer);
//             console.log("Saved To database");
//             res.contentType(final_img.contentType);
//             res.send(final_img.image);
//         }
//     })
// })

// app.use('/', express.static(path.join(__dirname, '/public')));

// app.all('*', (req, res) => {
//     res.status(404);
//     if (req.accepts('html')) {
//         res.sendFile(path.join(__dirname, 'views', '404.html'));
//     } else if (req.accepts('json')) {
//         res.json({ "error": "404 Not Found" });
//     } else {
//         res.type('txt').send("404 Not Found");
//     }
// });

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to store'
    })
})

app.use('/api/v1/auth', require('./routes/authRouter'))
app.use('/api/v1/', require('./routes/userRouter'))
app.use('/api/v1/', require('./routes/roleRouter'))
app.use('/api/v1/product', require('./routes/productRouter'))
app.use('/uploads', express.static('uploads'))

// app.use('/api/products', require('./routes/products'))

mongoose.connect(process.env.DB_CONNECTION).then(() => {
    app.listen(PORT, () => console.log(PORT))
    console.log('Connected to MongoDB')
}).catch(err => {
    console.log('Connection error', err)
    process.exit()
})