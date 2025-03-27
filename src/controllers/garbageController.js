const GarbageBin = require("../models/GarbageBin");

let requestCount = 0; // Counter outside the function

const postGarbageData = async (req, res) => {
  try {
    requestCount++; // Increment counter
    console.log(`[${requestCount}] Request Body:`, req.body); // Indexed log

    const { location, weight, level, battery } = req.body;

    if (!location || weight === undefined || level === undefined || battery === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newReading = {
      weight,
      level,
      battery,
      timestamp: new Date()
    };

    let garbageBin = await GarbageBin.findOne({ location });

    if (garbageBin) {
      garbageBin.readings.push(newReading);
      await garbageBin.save();
      res.status(200).json({ message: "Reading added to existing bin" });
    } else {
      const newGarbageBin = new GarbageBin({
        location,
        readings: [newReading]
      });
      await newGarbageBin.save();
      res.status(201).json({ message: "New bin created and reading saved" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Fetch all garbage bins with readings
const getGarbageData = async (req, res) => {
  try {
    const data = await GarbageBin.find().sort({ location: 1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { postGarbageData, getGarbageData };
