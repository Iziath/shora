const mongoose = require('mongoose');

const botSchema = new mongoose.Schema({
    text_user: {
        type: String,
        required: true
    },
    text_bot: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Bot', botSchema);



