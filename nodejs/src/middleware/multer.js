const multer = require('@koa/multer');
const path = require('path');

const limits = {
    fileSize: 1313131 * 31313131,
    files: 10,
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file);
        cb(null, path.join(__dirname, '../../public'));
    },
    filename: (req, file, cb) => {
        const date = Date.now();
        const type = file.originalname.split('.')[1];
        if (type !== 'jpg' && type !== 'png') {
            console.log(type);
            cb(new Error('Undefined type of file. Must be jpg or png'));
            return;
        }
        cb(null, file.fieldname + '-' + date + '.' + type); 
    },
});

module.exports = multer({ storage, limits });

