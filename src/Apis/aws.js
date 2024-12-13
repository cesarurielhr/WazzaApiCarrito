require('dotenv').config();
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

// Configura AWS S3
const s3 = new AWS.S3({
    region: 'us-east-2', // Cambia según tu región
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Función para subir un archivo a S3
const uploadToS3 = async (filePath, bucketName, key) => {
    const fileStream = fs.createReadStream(filePath);

    const params = {
        Bucket: bucketName,
        Key: key, // Nombre del archivo en S3
        Body: fileStream,
        ContentType: 'application/zip', // Cambia según el tipo de archivo
    };

    try {
        
        const uploadResult = await s3.upload(params).promise();
        console.log('Archivo subido:', uploadResult.Location);

        await generatePresignedUrl(bucketName, key);

        return uploadResult.Location; // Devuelve el enlace público del archivo
    } catch (error) {
        console.error('Error subiendo a S3:', error);
        throw error;
    }
};

const generatePresignedUrl = async (bucketName, key) => {
    const params = {
        Bucket: bucketName,
        Key: key,
        Expires: 60 * 60, // El enlace será válido por 1 hora
    };

    try {
        const url = await s3.getSignedUrlPromise('getObject', params);
        console.log('Presigned URL:', url);
        return url;
    } catch (error) {
        console.error('Error al generar el presigned URL:', error);
        throw error;
    }
};

module.exports = { uploadToS3 };
