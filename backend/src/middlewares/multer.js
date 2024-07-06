import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, './public/temp')
        cb(null, '/tmp')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

// kb * byte 1kb  = 1024 byte
const fileSize = 300 * 1024 // = 300kb

const fileFilter = (req, file, cb) => {
    if(!file.mimetype.startsWith("image/")){
        return cb(new Error("Only image is allowed !"), false)
    }
    cb(null, true)
}


export const upload  = multer({ storage, limits: {fileSize: fileSize}, fileFilter})