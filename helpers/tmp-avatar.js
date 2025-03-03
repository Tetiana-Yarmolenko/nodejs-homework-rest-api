const multer = require('multer')
const path = require('path')
require('dotenv').config()

const TMP_DIR= path.join(process.cwd(), process.env.TMP_DIR)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TMP_DIR)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({
    storage: storage,
    limits: {fileSize: 2000000},
    fileFilter: (req, file, cb) => {
        if (file.mimetype.includes('image')) {
            // Чтобы принять файл, используется как аргумент `true` таким образом:
            cb(null, true)
        return
    }
const err = new Error('Загружен не файл изображения!')
    err.status = 400
    cb(err)
    // Чтобы отклонить, прокиньте в аргументы `false` так:
    // cb(null, false)
}
})

module.exports = upload