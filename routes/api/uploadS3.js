const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const config = require('../../config/default');
const AWS = require('aws-sdk');
const uuid = require('uuid');

AWS.config.update({
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();
const upload = multer({ dest: "uploads/" });

// POST endpoint for uploading images to S3
router.post('/upload', upload.single('image'), async (req, res) => {
    const file = req.file;
    const fileContent = fs.readFileSync(file.path);
    const params = {
        Bucket: config.AWS_BUCKET_NAME,
        Key: `${uuid.v4()}-${file.originalname}`,
        Body: fileContent,
        ACL: 'public-read'
    };

    s3.upload(params, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Failed to upload image to S3");
        }

        console.log("File uploaded to ", data.Location);
        res.json({ imageUrl: data.Location });
    });
});

module.exports = router;