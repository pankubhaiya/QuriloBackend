const multer = require("multer")
const path= require('path')

// Define the file storage and type filter using Multer
const storage = multer.diskStorage({
  destination: "./uploads", // Define your file upload destination
  filename: (req, file, callback) => {
      callback(null, "_" + Date.now() + file.originalname);
  }
}); 
  

// Custom function to validate file type
const validateFileType =(req,file, callback)=> {
  const allowedFileTypes = ['pdf','jpg','png','jpeg'];
  const fileExt = file.originalname.split('.').pop().toLowerCase();
  if (allowedFileTypes.includes(fileExt)) {
    return callback(null, true);
  }
  else{
    req.fileValidationError = 'Invalid file type';
  callback(null, false);
  }
};
const uploadMulter = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
      validateFileType(req, file, callback);
  },
});
  
module.exports={uploadMulter,validateFileType}