// models/Request.js

const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true
    },
    endpoint: {
        type: String,
        required: true
    }
});

const History = mongoose.model('History', requestSchema);

module.exports = History;
