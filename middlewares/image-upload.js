const multer = require('multer')
const uuid = require('uuid').v4
const upload = multer({
    storage:multer.diskStorage({
        destination:"product-data/images",
        filename:function(req,file,cb){
            cb(null,uuid() + "-"+file.originalname)
        }
    })
})

const Multermiddleware =upload.single('img')//img is the name assigned to the input file type in new-product.ejs

module.exports = Multermiddleware