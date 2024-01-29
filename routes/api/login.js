const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Login = require('../../models/Login');

// @route   GET api/recipes/
// @desc    GET all recipes
// @access  Public
router.get("/", (req, res) => {
    Recipe
        .find()
        .sort({ id: "asc"})
        .then(recipes => res.json(recipes))
        .catch(err => res.status(404).json(err));
});

router.post("/login", async (req, res) => {
    const {username, password} = req.body;

    try {
        const usernameExists = await collection.findOne({ username: username });

        if (usernameExists) {
            res.json()
        } else {
            res.json()
        }
    } catch (err) {

    }
});

router.post("/register", async (req, res) => {
    const {username, password} = req.body;

    const data = {
        username,
        password
    }

    try {
        const usernameExists = await collection.findOne({ username: username });

        if (usernameExists) {
            res.json()
        } else {
            await collection.insertMany([data]);
        }
    } catch (err) {

    }
});

module.exports = router;