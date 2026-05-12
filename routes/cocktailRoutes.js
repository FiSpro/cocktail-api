const express = require("express");
const router = express.Router();
const Cocktail = require("../models/Cocktail");

// Get all cocktails - sorted by newest first
router.get("/", async (req, res) => {
  try {
    const cocktails = await Cocktail.find().sort({ createdAt: -1 });
    console.log(`📤 Returning ${cocktails.length} cocktails (newest first)`);
    res.json(cocktails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get by category
router.get("/category/:category", async (req, res) => {
  try {
    const cocktails = await Cocktail.find({
      category: req.params.category,
    }).sort({ name: 1 });
    res.json(cocktails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search
router.get("/search/:query", async (req, res) => {
  try {
    const cocktails = await Cocktail.find({
      name: { $regex: req.params.query, $options: "i" },
    });
    res.json(cocktails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single cocktail
router.get("/:id", async (req, res) => {
  try {
    const cocktail = await Cocktail.findById(req.params.id);
    if (!cocktail) return res.status(404).json({ error: "Not found" });
    res.json(cocktail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create cocktail
router.post("/", async (req, res) => {
  try {
    const cocktail = new Cocktail(req.body);
    await cocktail.save();
    res.status(201).json(cocktail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update cocktail
router.put("/:id", async (req, res) => {
  try {
    const cocktail = await Cocktail.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(cocktail);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete cocktail
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Cocktail.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Cocktail not found" });
    }
    res.json({ message: "Cocktail deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
