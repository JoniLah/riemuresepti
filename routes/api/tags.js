const express = require('express');
const router = express.Router();
const Tag = require('../../models/Tag');

// Get all tags
router.get('/', async (req, res) => {
    try {
        const tags = await Tag.find();
        res.json(tags);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create a new tag
router.post('/', async (req, res) => {
    const { name } = req.body;

    try {
        const tag = await Tag.create({ name });
        res.json(tag);
    } catch (error) {
        res.status(400).json({ error: 'Tag already exists' });
    }
});

module.exports = router;