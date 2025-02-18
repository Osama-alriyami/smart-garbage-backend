const GarbageBin = require("../models/GarbageBin");

// @desc    Post collected data
// @route   POST /api/garbage
const postGarbageData = async (req, res) => {
  try {
    const { location, weight, level, battery } = req.body;
    
    if (!location || !weight || !level || !battery) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const garbageData = new GarbageBin({ location, weight, level, battery });
    await garbageData.save();
    res.status(201).json({ message: "Garbage data saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Fetch all garbage data
// @route   GET /api/garbage
const getGarbageData = async (req, res) => {
  try {
    const data = await GarbageBin.find().sort({ timestamp: -1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { postGarbageData, getGarbageData };
