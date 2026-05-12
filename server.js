const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const cocktailRoutes = require("./routes/cocktailRoutes");

const app = express();

// Allow requests from anywhere
app.use(
  cors({
    origin: "*", // Allow all origins for your APK
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  }),
);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    console.log("📊 Database name:", mongoose.connection.db.databaseName);
  })
  .catch((err) => console.log("❌ MongoDB Error:", err));

// Routes
app.use("/api/cocktails", cocktailRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
  //console.log(`📡 API endpoint: http://0.0.0.0:${PORT}/api/cocktails`);
});
