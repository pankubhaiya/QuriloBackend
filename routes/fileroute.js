const express = require("express");
const fs = require("fs");
const { uploadMulter, validateFileType } = require("../config/multerconfig");
const { fileModel } = require("../model/fileModel");

const FileRouter = express.Router();

FileRouter.post(
  "/upload",
  uploadMulter.array("files", 10),
  async (req, res) => {
    if (req.fileValidationError) {
      return res.status(400).json({
        message: "Analysis failed!",
        error: req.fileValidationError,
      });
    }
    try {
      const { firstname, lastname, dob, address, conforgaddress, email } =
        req.body;

      if (
        !firstname ||
        !lastname ||
        !dob ||
        !address ||
        !conforgaddress ||
        !email
      ) {
        return res.status(400).json({ error: "All fields are required" });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No files provided" });
      }

      const uploadedFiles = [];

      for (const file of req.files) {
        const fileData = fs.readFileSync(file.path);
        let documentData = {
          filename: file.originalname,
          data: fileData,
          contentType: file.mimetype,
        };
        uploadedFiles.push(documentData);
        // Remove uploaded file from disk
        fs.unlinkSync(file.path);
      }
      const uploadedFile = new fileModel({
        firstname: firstname,
        lastname: lastname,
        dob: dob,
        email: email,
        address: address,
        conforgaddress: conforgaddress,
        document: uploadedFiles,
      });
      await uploadedFile.save();

      return res.status(200).json({
        msg: "Files uploaded successfully",
        files: uploadedFiles,
      });
    } catch (error) {
      console.error("Error uploading files:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = { FileRouter };
