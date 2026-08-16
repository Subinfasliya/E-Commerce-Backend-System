const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
const path = require("path");

const uploadImage = (file) => {
  const extension = path.extname(file.originalname);

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "Shop-Mart/products",
        resource_type: "image",
        public_id: `${Date.now()}${extension}`,
        use_filename: true,
        unique_filename: false,
      },
      (error, result) => {
        if (error) return reject(error);

        resolve(result);
      },
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

const deleteImage = async (publicId) => {
  return cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
  });
};

module.exports = { uploadImage, deleteImage };
