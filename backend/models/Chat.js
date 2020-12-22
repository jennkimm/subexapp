mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = mongoose.Schema({
    message: {
        type: String
    },
    sender: {
        type: Schema.Types.ObjectId,
    },
    type: {
        type: String
    },
}, { timestamps: true });

const chat = mongoose.model('Chat', chatSchema);
module.exports = { Chat }