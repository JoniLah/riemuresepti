const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InstructionsSchema = new Schema({
    stepNumber: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
});

const IngredientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        default: "g"
    }
});

const RecipesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    imgPath: {
        type: String
    },
    time: {
        type: String,
        required: true
    },
    brief: {
        type: String
    },
    portions: {
        type: Number,
        required: true
    },
    ingredients: [IngredientSchema],
    instructions: [InstructionsSchema],
    type: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        lowercase: true,
        trim: true
    }],
    rating: {
        type: Schema.Types.Decimal128
    }
});

module.exports = Recipe = mongoose.model("recipe", RecipesSchema);