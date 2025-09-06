const multer = require("multer");
const path = require("path");
const fs = require("fs");


// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "..", "uploads");
fs.mkdirSync(uploadDir, { recursive: true });


const storage = multer.diskStorage({
destination: (req, file, cb) => {
cb(null, uploadDir);
},
filename: (req, file, cb) => {
const ext = path.extname(file.originalname).toLowerCase();
const base = path
.basename(file.originalname, ext)
.replace(/\s+/g, "-")
.replace(/[^a-zA-Z0-9-_]/g, "");
cb(null, `${Date.now()}-${base}${ext}`);
},
});


const fileFilter = (req, file, cb) => {
const allowed = ["image/jpeg", "image/png", "image/jpg"];
if (allowed.includes(file.mimetype)) return cb(null, true);
cb(new Error("Only .jpeg, .jpg and .png formats are allowed"));
};


const upload = multer({
storage,
fileFilter,
limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});


module.exports = upload;