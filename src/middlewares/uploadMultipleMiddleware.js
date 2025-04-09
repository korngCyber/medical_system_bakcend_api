const multer2 = require("multer");
const path = require("path");

// Configure storage
const storage = multer2.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../upload"));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
};

const uploadMultiple = multer2({ storage, fileFilter }).array("images", 10);

module.exports = uploadMultiple;