// models/Settings.js
const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
    blockedWebsites: {
        type: [String],
        required: true,
    },
    allowedGames: {
        type: [String],
        required: true,
    },
    timeLimit: {
        type: Number,
        default: 60,
    },
    schedule: {
        type: String,
        default: 'always',
    },
    customSchedule: {
        type: String,
        default: '',
    },
    alertEmail: {
        type: String,
        required: true,
    },
    alertFrequency: {
        type: String,
        default: 'immediately',
    },
    password: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Settings', SettingsSchema);
