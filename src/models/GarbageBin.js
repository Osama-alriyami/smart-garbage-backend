const mongoose = require("mongoose");

const GarbageBinSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  battery: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("GarbageBin", GarbageBinSchema);
