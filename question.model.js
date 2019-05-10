const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new mongoose.Schema({
    title: String,
    description: String,
});

module.exports = mongoose.model('question', questionSchema);