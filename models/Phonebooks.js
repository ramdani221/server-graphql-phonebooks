const { Schema, model } = require("mongoose");

const phonebooksSchema = new Schema({
    name: String,
    phone: String,
    avatar: {
        type: String,
        default: null
    }
}, { versionKey: false });

module.exports = model('Phonebooks', phonebooksSchema)