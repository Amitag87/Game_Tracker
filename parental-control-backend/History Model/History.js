// models/History.js
const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
    website: {
        type: String,
        required: true,
    },
    visitedAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('History', HistorySchema);
