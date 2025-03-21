// models/GarbageBin.js
const mongoose = require("mongoose");

const GarbageReadingSchema = new mongoose.Schema({
  weight: { type: Number, required: true },
  level: { type: Number, required: true },
  battery: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

const GarbageBinSchema = new mongoose.Schema({
  location: { type: String, required: true, unique: true },
  readings: [GarbageReadingSchema],
});

module.exports = mongoose.model("GarbageBin", GarbageBinSchema);
