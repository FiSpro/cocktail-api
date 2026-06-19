const mongoose = require("mongoose");

const cocktailSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      lowercase: true,
    },
    ingredients: [
      {
        type: String,
        required: true,
      },
    ],
    instructions: {
      type: String,
      default: "Ni določeno",
    },
    garnish: {
      type: String,
      default: "Ni določeno",
    },
  },
  {
    timestamps: true, // This automatically adds createdAt and updatedAt
  },
);

module.exports = mongoose.model("Cocktail", cocktailSchema);
