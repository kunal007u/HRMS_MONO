const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const sharp = require('sharp');


// AWS S3 configuration
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
 
// Multer configuration
const maxSize = 8 * 1024 * 1024; // 8MB

const fileType = ['application/msword'];
const fileFilter = (req, file, cb) => {
  if (fileType.includes(file.mimetype)) {
    const error = new Error('Document files are not allowed');
    return cb(error, false);
  }
  cb(null, true); // Accept all file types except the restricted ones
};

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: maxSize },
  fileFilter: fileFilter,
});

// S3 file operations
const uploadFile = async (file) => {
    const params = {
        Bucket: BUCKET_NAME,
        Key: `${file.fieldname}-${Date.now()}-${file.originalname.split('.')[0]}.${file.mimetype.split('/').pop()}`,
        Body: file.buffer,
        ContentType: file.mimetype,
    };
    try {
        const command = new PutObjectCommand(params);
        const data = await s3Client.send(command);
        const fileLocation = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;

         // Generate and upload thumbnail asynchronously
         await uploadThumbnail(file.buffer, params.Key);

        return { ...data, Location: fileLocation,  key: params.Key };
    } catch (error) {
        console.error(`Error uploading file to S3: ${error.message}`);
        throw error;
    }
};

const uploadThumbnail = async (buffer, originalKey) => {
    try {
        const thumbnailBuffer = await sharp(buffer)
            .resize(200, 200).jpeg({ quality: 80 })
            .toBuffer();

        const thumbnailKey = `thumbnails/${originalKey}`;

        const thumbnailParams = {
            Bucket: BUCKET_NAME,
            Key: thumbnailKey,
            Body: thumbnailBuffer,
            ContentType: 'image/jpeg',
        };  

        await s3Client.send(new PutObjectCommand(thumbnailParams));
        return thumbnailKey;
    } catch (error) {
        console.error(`Error uploading thumbnail to S3: ${error.message}`);
    }
};

const downloadFileFromS3 = async (key) => {
    try {
        const params = {
            Bucket: BUCKET_NAME,
            Key: key,
        };

        const command = new GetObjectCommand(params);
        const data = await s3Client.send(command);
        return data.Body;
    } catch (error) {
        console.error(`Error downloading file from S3: ${error.message}`);
        throw error;
    }
};

const deleteFile = async (key) => {
    const params = {
        Bucket: BUCKET_NAME,
        Key: key,
    };

    try {
        const command = new DeleteObjectCommand(params);
        const data = await s3Client.send(command);
        return data;
    } catch (error) {
        console.error(`Error deleting file from S3: ${error.message}`);
        throw error;
    }
};

const multerErrorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).send({ message: 'File too large, It should be less then 8 MB' });
      }
      return res.status(400).send({ message: err.message });
    }
    next(err); // Pass the error to the next middleware
  };

module.exports = { upload, uploadFile, downloadFileFromS3, deleteFile , multerErrorHandler};