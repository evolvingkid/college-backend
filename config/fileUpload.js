const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
uuidv4();

//TODO: needed to place file type and size
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
     },
    filename: function (req, file, cd) { 
        cd(null, uuidv4()+file.originalname);
    },
});
exports.fileUpload = multer({  storage : storage });
