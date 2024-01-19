import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

// kb * byte 1kb  = 1024 byte
const fileSize = 200 * 1024 // = 100kb

const fileFilter = (req, file, cb) => {
    if(!file.mimetype.startsWith("image/")){
        return cb(new Error("Only image is allowed !"), false)
    }
    cb(null, true)
}


export const upload  = multer({ storage, limits: {fileSize: fileSize}, fileFilter})