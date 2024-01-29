const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagsSchema = new Schema({
    name: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
});

module.exports = mongoose.model("tag", TagsSchema);