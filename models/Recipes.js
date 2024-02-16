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
        type: Number
    },
    unit: {
        type: String
    },
    heading: {
        type: String
    }
});

const CommonSchema = new Schema({
    value: {
        type: String
    },
    label: {
        type: String
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
        type: new Schema(CommonSchema),
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
        type: new Schema(CommonSchema),
        required: true
    },
    tags: [CommonSchema],
    allergens: [CommonSchema],
    rating: {
        type: Schema.Types.Decimal128
    }
});

module.exports = Recipe = mongoose.model("recipe", RecipesSchema);