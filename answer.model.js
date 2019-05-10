const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new mongoose.Schema({
    parentId: String,
    text: String,
    rating: Number
});

module.exports = mongoose.model('answer', answerSchema);
