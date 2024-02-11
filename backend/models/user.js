// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    creationDate: { type: Date, default: Date.now },
    phoneNumber: {type: String, required: true},
    updateDate: { type: Date },
    deletionDate: { type: Date },
    isAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model('user', userSchema);
