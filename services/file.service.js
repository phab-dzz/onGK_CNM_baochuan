require('dotenv').config();

const { s3 } = require('../utils/aws-helper');
const path=require('path');
const randomString = numberCharacter => {
    return Math.random().toString(36).substring(2, numberCharacter + 2);
};

const FILE_TYPE_MATCH = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif",
    "video/mp3",
    "video/mp4",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.rar",
    "application/zip",
];

const uploadFile = async(file) => {
    const id = randomString(10);
    const imageExt = path.extname(file.originalname).toLowerCase();
        const filePath = `${id}_${Date.now()}${imageExt}`;
    // if (FILE_TYPE_MATCH.indexOf(file.mimetype === -1)) {
    //     throw new Error(`${file?.originalname} is invalid!`);
    // }

    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: filePath,
        Body: file?.buffer,
        ContentType: file?.mimetype,
    };

    try {
        const data = await s3.upload(uploadParams).promise();
        console.log('File uploaded successfully ', data.Location);
        const fileName = data.Location;
        return fileName;
    } catch (error) {
        console.error('Error uploading file', error);
        throw new Error("Upload file to AWS S3 failed");
    }
}

module.exports = {
    uploadFile,
}