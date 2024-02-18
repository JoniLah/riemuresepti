const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Recipe = require('../../models/Recipes');
const Tag = require('../../models/Tag');
// const Redis = require('redis');
// const redisClient = Redis.createClient();
// const DEFAULT_EXPIRATION = 3600;

// (async () => {
//     await redisClient.connect();
// })();

// @route   GET api/recipes/
// @desc    GET all recipes
// @access  Public
router.get("/", async (req, res) => {
    try {
        let recipes = await Recipe.find().sort({ id: "asc" });

        // redisClient.setEx("recipes", DEFAULT_EXPIRATION, JSON.stringify(recipes));

        res.json(recipes);
    } catch (err) {
        console.error("Error fetching recipes: ", err);
        res.status(404).json(err);
    }
});

// @route   GET api/recipes/id
// @desc    GET a recipe by ID
// @access  Public
router.get("/:id", async (req, res) => {
    const recipeId = req.params.id;

    if (!ObjectId.isValid(recipeId)) {
        return res.status(400).json({ error: "Invalid recipe ID" });
    }

    try {
        let recipe = await Recipe.findById(recipeId);

        res.json(recipe);
    } catch (err) {
        res.status(404).json(err);
    }
});

// @route   POST api/recipes/
// @desc    POST a recipe
// @access  Public
router.post("/", async (req, res) => {
    console.log("Received Data ", req.body);
    try {
        let recipe = new Recipe({
            title: req.body.title,
            imgPath: req.body.imgPath,
            time: req.body.time,
            portions: req.body.portions,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            brief: req.body.brief,
            type: req.body.type,
            tags: req.body.tags,
            allergens: req.body.allergens
        });
        recipe = await recipe.save();
        res.send(recipe);
    } catch (err) {
        console.error(err); // Log the error to the console
        res.status(500).json(err);
    }
});

// @route   PUT api/recipes/id
// @desc    Update a recipe
// @access  Public
router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const { tags, ...otherFields } = req.body;

    try {
        const existingTags = await Tag.find({ name: { $in: tags } });
        if (existingTags.length !== tags.length) {
            return res.status(400).json({ error: "Invalid tags" });
        }

        const recipe = await Recipe.findByIdAndUpdate(id, { ...otherFields, tags }, { new: true });

        if (!recipe) {
            return res.status(404).json({ error: "Recipe not found" });
        }

        res.json(recipe);
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;