const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    keywords: { type: String }
});

module.exports = mongoose.model("blog", BlogSchema);