require('dotenv').config();

const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET
})

const s3 = new AWS.S3;

const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports = { s3, dynamodb };