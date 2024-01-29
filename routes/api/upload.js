const express = require('express');
const router = express.Router();
const multer = require('multer');

// Define storage for the uploaded images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, 'uploads/');
        cb(null, 'client/public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

// POST endpoint for uploading images
router.post('/upload', upload.single('image'), (req, res) => {
    const filePath = req.file.path;
    res.json({ filePath });
});

module.exports = router;