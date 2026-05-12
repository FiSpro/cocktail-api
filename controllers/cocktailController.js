const Cocktail = require("../models/Cocktail");

// Get all cocktails
const getAllCocktails = async (req, res) => {
  try {
    const cocktails = await Cocktail.find().sort({ name: 1 });
    res.json(cocktails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get cocktails by category
const getCocktailsByCategory = async (req, res) => {
  try {
    const cocktails = await Cocktail.find({
      category: req.params.category,
    }).sort({ name: 1 });
    res.json(cocktails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search cocktails by name
const searchCocktails = async (req, res) => {
  try {
    const cocktails = await Cocktail.find({
      name: { $regex: req.params.query, $options: "i" },
    });
    res.json(cocktails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single cocktail by ID
const getCocktailById = async (req, res) => {
  try {
    const cocktail = await Cocktail.findById(req.params.id);
    if (!cocktail) {
      return res.status(404).json({ error: "Cocktail not found" });
    }
    res.json(cocktail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new cocktail
const createCocktail = async (req, res) => {
  try {
    const cocktail = new Cocktail(req.body);
    await cocktail.save();
    res.status(201).json(cocktail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update cocktail
const updateCocktail = async (req, res) => {
  try {
    const cocktail = await Cocktail.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!cocktail) {
      return res.status(404).json({ error: "Cocktail not found" });
    }
    res.json(cocktail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete cocktail
const deleteCocktail = async (req, res) => {
  try {
    const cocktail = await Cocktail.findByIdAndDelete(req.params.id);
    if (!cocktail) {
      return res.status(404).json({ error: "Cocktail not found" });
    }
    res.json({ message: "Cocktail deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCocktails,
  getCocktailsByCategory,
  searchCocktails,
  getCocktailById,
  createCocktail,
  updateCocktail,
  deleteCocktail,
};
