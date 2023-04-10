const multer = require("multer");
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    cb(null, Date.now() + ext);
  },

});

let upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg') {
      callback(null, true)
    } else {
      console.log('only format jpg & png')
      callback(null, false)
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2
  }
})
console.log('upload limit', upload.limits)

module.exports = upload;