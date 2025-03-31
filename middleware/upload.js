const multer = require('multer');
const path = require('path');
const storage = multer.memoryStorage({
    destination: function(req, file, callback) {
        callback(null, '/');
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Error: Images only!'));
        }
    }
}).single("image");

module.exports = upload;