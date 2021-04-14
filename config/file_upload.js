const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
     },
    filename: function (req, file, cd) { 
        cd(null, uuidv4()+file.originalname);
    },
});

module.export = storage;