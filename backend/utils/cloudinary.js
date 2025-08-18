const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {     
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    fs.unlink(localFilePath, (err) => {
      if (err) console.error("Error deleting local file:", err);
    });

    return response;

  } catch (e) {
    fs.unlink(localFilePath, (err) => {
      if (err) console.error("Error deleting local file:", err);
    });  
    console.error("Cloudinary error:", e);
    return null;
  }
};

module.exports =  {uploadOnCloudinary}
