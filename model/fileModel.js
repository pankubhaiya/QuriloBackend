
const mongoose = require("mongoose");
const fileSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email:{ type: String, required: true },
    dob: { type: String, required: true },
    address: { type: String, required: true },
    conforgaddress: { type: String, required: true },
    document: [
        {
            filename: { type: String, required: true },
            data: { type: Buffer, required: true },
            contentType: { type: String, required: true }
        }
    ]
});

const fileModel = mongoose.model("File", fileSchema);

module.exports = { fileModel };

