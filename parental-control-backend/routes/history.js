// routes/history.js
const express = require('express');
const router = express.Router();
const History = require('../Settings Model/History');

// GET /api/history - Get all website history
router.get('/', async (req, res) => {
    try {
        const history = await History.find().sort({ visitedAt: -1 });
        res.json(history);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/history - Add a website to history
router.post('/', async (req, res) => {
    try {
        const newEntry = new History({ website: req.body.website });
        await newEntry.save();
        res.json(newEntry);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE /api/history - Clear all website history
router.delete('/', async (req, res) => {
    try {
        await History.deleteMany();
        res.json({ msg: 'History cleared' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
