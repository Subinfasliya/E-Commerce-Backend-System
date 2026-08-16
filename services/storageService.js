const cloudinaryService = require("./cloudinaryService");

const uploadNewImage = async (image) => {
  return cloudinaryService.uploadImage(image);
};

const removeExistingImage = async (publicId) => {
  return cloudinaryService.deleteImage(publicId);
};

module.exports = { uploadNewImage, removeExistingImage };
