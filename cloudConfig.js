const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'airbnb_dev', 
    allowedFormats: ['jpeg', 'png', 'jpg'],
    public_id: (req, file) => `${Date.now()}-${file.originalname.split('.')[0]}`
  }
});

module.exports = { cloudinary, storage };
